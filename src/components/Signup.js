import React, { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== passwordConfirm) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(email, password)
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

  return (
    <>
      <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
        </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </>
  )
}
