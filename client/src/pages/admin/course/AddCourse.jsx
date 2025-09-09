import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'

const AddCourse = () => {
    const [courseTitle, setcourseTitle] = useState("");
    const [Category, setCategory] = useState("");

    const [createCourse, {data,isLoading,error,isSuccess}] = useCreateCourseMutation();

    const Navigate = useNavigate();

    const createCourseHandler = async () => {
        await createCourse({courseTitle,Category});
    };

    // for display toast
    const getSelectedCategory = (value) =>{
        alert(value);
        setCategory(value);
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Course created.")
        }
    },[isSuccess,error])

    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>Let's add course, add some basic course details your new course</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, perspiciatis!</p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setcourseTitle(e.target.value)}
                        placeholder="Your Course Name"
                    />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Nextjs">Next Js</SelectItem>
                                <SelectItem value="DataScience">Data Science</SelectItem>
                                <SelectItem value="FrontendDeveloper">Frontend Developer</SelectItem>
                                <SelectItem value="MernStackDevelopmnet">Mern Stack Developmnet</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDb">MongoDb</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button variant="outline" onClick={() => Navigate("/admin/course")}>Back</Button>
                    <Button disabled={isLoading} onClick={createCourseHandler}>{
                        isLoading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                PLease Wait
                            </>
                        ) : "Create"
                    }</Button>
                </div>
            </div>

        </div>
    )
}

export default AddCourse