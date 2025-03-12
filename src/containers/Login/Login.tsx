// Updated Login Container Component
import React, { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation, gql } from "@apollo/client";
import { apolloClient } from "../../api/client";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Login = ({ login }:any) => {
  const [loginForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    client: apolloClient,
    onCompleted: (data) => {
      setLoading(false);
      message.success("Login successful!");
      login(data.login.token);
    },
    onError: (error) => {
      setLoading(false);
      message.error("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    },
  });

  const onFinish = (values:any) => {
    setLoading(true);
    loginMutation({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card title="Helpdesk Login" style={{ width: 400 }}>
        <Form
          form={loginForm}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;