import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(`Login failed, ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 space-y-5">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-1">Login to AI SQL Agent</p>
          </div>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleLogin} className="w-full">
            {loading ? "Signing in..." : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
