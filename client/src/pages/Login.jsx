import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [signupValue, setsignupinValue] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loginValue, setLoginValue] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;

        if (type === "signup") {
            setsignupinValue({ ...signupValue, [name]: value })
        } else {
            setLoginValue({ ...loginValue, [name]: value })
        }
    };

    const [
        registerUser,
        {
            data: registerData,
            error: registerError,
            // isLoading: registerIsLoading,
            isSuccess: registerIsSuccess
        },
    ] = useRegisterUserMutation();
    const [loginUser, {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess
    },] = useLoginUserMutation();


    const handleSubmit = async (type) => {
        const data = type === "signup" ? signupValue : loginValue;
        const action = type === "signup" ? registerUser : loginUser
        await action(data)
    }

    useEffect(() => {
        if (registerError) {
            toast.error(registerData.data.message || "Signup Failed")
        }
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup successful")
        }
        if (loginError) {
            toast.error(loginData.data.message || "Login Failed")
        }
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successful")
            navigate("/")
        }
    }, [
        loginData,
        registerData,
        loginIsSuccess,
        registerIsSuccess,
        loginError,
        registerError
    ])

    return (
        <div className="flex w-full flex-col justify-center items-center mt-20">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you&apos; signup in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name"
                                    name="name"
                                    value={signupValue.name}
                                    type="text"
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Eg. user"
                                    required="true" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email"
                                    type="email"
                                    name="email"
                                    value={signupValue.email}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Eg. user@gmail.com"
                                    required="true" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password"
                                    type="password"
                                    name="password"
                                    value={signupValue.password}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Eg. xyz"
                                    required="true" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleSubmit("signup")}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After saving, you&apos;ll be Login.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email"
                                    type="email"
                                    name="email"
                                    value={loginValue.email}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Eg. user@gmail.com"
                                    required="true"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">New password</Label>
                                <Input id="password"
                                    type="password"
                                    name="password"
                                    value={loginValue.password}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Eg. xyz"
                                    required="true"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => handleSubmit("login")}>
                                {
                                    loginIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        </>
                                    ) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login;