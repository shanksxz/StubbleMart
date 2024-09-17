"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type LoginMethod = 'google' | 'credentials';

interface LoginCredentials {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return { credentials, handleInputChange };
};

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { credentials, handleInputChange } = useLoginForm();

  if (status === 'authenticated') {
    router.push('/');
    return null;
  }

  const handleLogin = async (method: LoginMethod) => {
    try {
      let res;
      if (method === 'google') {
        res = await signIn('google');
      } else {
        res = await signIn('credentials', {
          ...credentials,
          redirect: false
        });
      }

      console.log(res);

      if (res?.ok) {
        toast.success('Logged in successfully');
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/');
      } else if(res?.error) {
        toast.error(res?.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-raleway">
      <LoginPageLeft />
      <LoginPageRight 
        credentials={credentials}
        handleInputChange={handleInputChange}
        handleLogin={handleLogin}
      />
    </div>
  );
};

const LoginPageLeft: React.FC = () => (
  <motion.div
    className="md:w-1/2 p-8 text-white relative overflow-hidden"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_104214660-scaled%201-OClypndJeioXPbmxpouyTAX2U4bPty.png')] bg-cover bg-center"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-green-800/80"></div>
    <div className="absolute inset-0 backdrop-blur-[2px]"></div>
    <div className="relative z-20 h-full flex flex-col justify-between">
      <img src="/placeholder.svg?height=50&width=200" alt="Stubble Mart Logo" className="mb-8" />
      <div>
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Welcome Back</h1>
        <p className="mb-8 text-xl text-green-100 drop-shadow">
          Log in to access your Stubble Mart account and start managing your agricultural needs.
        </p>
      </div>
      <div className="text-sm text-green-100 mt-8 drop-shadow">
        © {new Date().getFullYear()} Stubble Mart. All rights reserved.
      </div>
    </div>
  </motion.div>
);

interface LoginPageRightProps {
  credentials: LoginCredentials;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (method: LoginMethod) => Promise<void>;
}

const LoginPageRight: React.FC<LoginPageRightProps> = ({ credentials, handleInputChange, handleLogin }) => (
  <motion.div
    className="md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-8 text-green-700">Login</h2>
      
      <Button onClick={() => handleLogin('google')} variant="outline" className="w-full mb-4 h-12 text-lg flex items-center justify-center gap-2">
        Continue with Google
      </Button>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
          Or continue with email
        </span>
      </div>

      <form className="space-y-6" onSubmit={(e) => {
        e.preventDefault();
        handleLogin('credentials');
      }}>
        <div>
          <Label htmlFor="email" className="text-lg">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 h-12"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-lg">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="mt-1 h-12"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2">
          <Mail className="w-5 h-5" />
          Login with Email
        </Button>
      </form>

      <div className="mt-6 text-center space-y-4">
        <div className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-green-600 hover:underline font-semibold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

export default LoginPage;