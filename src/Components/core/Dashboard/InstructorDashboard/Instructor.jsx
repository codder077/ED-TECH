// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
// import { getInstructorData } from '../../../../services/operations/profileAPI';
// import InstructorChart from './InstructorChart';
// import { Link } from 'react-router-dom';

// const Instructor = () => {
//     const {token} = useSelector((state)=> state.auth);
//     const {user} = useSelector((state)=>state.profile);
//     const [loading, setLoading] = useState(false);
//     const [instructorData, setInstructorData] = useState(null);
//     const [courses, setCourses] = useState([]);

//     useEffect(()=> {
//         const getCourseDataWithStats = async() => {
//             setLoading(true);
            
//             const instructorApiData = await getInstructorData(token);
//             const result = await fetchInstructorCourses(token);

//             console.log(instructorApiData);

//             // if(instructorApiData.length)
//             //     setInstructorData(instructorApiData);

//             if(result) {
//                 setCourses(result);
//             }
//             setLoading(false);
//         }
//         getCourseDataWithStats();
//     },[])

//     const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0);
//     const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled, 0);

//   return (
//     <div className='text-white'>
//       <div>
//         <h1>Hi {user?.firstName}</h1>
//         <p>Let's start something new</p>
//       </div>

//       {loading ? (<div className='spinner'></div>)
//       :courses > 0 
//         ? (<div>
//             <div>
//             <div>
//                 <InstructorChart  courses={instructorData}/>
//                 <div>
//                     <p>Statistics</p>
//                     <div>
//                         <p>Total Courses</p>
//                         {/* <p>{courses.length}</p> */}
//                     </div>

//                     <div>
//                         <p>Total Students</p>
//                         <p>{totalStudents}</p>
//                     </div>

//                     <div>
//                         <p>Total Income</p>
//                         <p>{totalAmount}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div>
//             {/* Render 3 courses */}
//             <div>
//                 <p>Your Courses</p>
//                 <Link to="/dashboard/my-courses">
//                     <p>View all</p>
//                 </Link>
//             </div>
//             <div>
//                 {
//                     courses.slice(0,3).map((course)=> (
//                         <div>
//                             <img 
//                                 src={course.thumbnail}
//                             />
//                             <div>
//                                 <p>{course.courseName}</p>
//                                 <div>
//                                     <p>{course.studentsEnrolled.length} students</p>
//                                     <p> | </p>
//                                     <p> Rs {course.price}</p>
//                                 </div>

//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//         </div>
        
//         )
//         :(<div>
//             <p>You have not created any courses yet</p>
//             <Link to={"/dashboard/addCourse"}>
//                 Create a Course
//             </Link>
//         </div>)}
//     </div>
//   )
// }

// export default Instructor

import React from 'react'
import { useEffect } from 'react'
import { getInstructorDashboard } from '../../../../services/operations/profileAPI'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router'
import InstructorChart from './InstructorChart';

const InstructorDashboard = () => {
    const [details, setDetails] = useState([])
    const [courses, setCourses] = useState([])
    const [currentChart, setCurrentChart] = useState('revenue');
    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            //get instructor details
            const instructorDetails = await getInstructorDashboard(token, dispatch);
            const instructorCourses = await fetchInstructorCourses(token);

            setCourses(instructorCourses);
            console.log("details",instructorDetails);
            console.log("courses",instructorCourses);
            setDetails(instructorDetails);
        })();
    }, [])

    const totalEarnings = details?.reduce((acc, course) => {
        return acc + course?.totalRevenue;
    }, 0);
    const totalStudents = details?.reduce((acc, course) => {
        return acc + course?.totalStudents;
    }, 0);

  return (
    <div>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <div>
                <div className='space-y-2'>
                    <h1 className='text-2xl font-bold text-richblack-5'>Hi {user?.firstName} 👋</h1>
                    <p className='font-medium text-richblack-200'>Let's start something new</p>
                </div>
                <div  className='my-4 flex flex-col-reverse  gap-3 md:flex-row md:flex md:h-[450px] md:space-x-4'>
                    <div className='flex flex-col flex-1 rounded-md bg-richblack-800 p-6'>
                        <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-richblack-5'>
                        Visualize
                        </p>
                        <div className='flex items-center space-x-4'>
                        <button onClick={() => setCurrentChart('revenue')} className={`px-2 py-2 rounded-md ${currentChart === 'revenue' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>Revenue</button>
                        <button onClick={() => setCurrentChart('students')} className={`px-2 py-2 rounded-md ${currentChart === 'students' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>Students</button>
            </div>
                        </div>
                        {/* <InstructorChart details={details} currentChart={currentChart}/> */}
                    </div>
                    <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
                        <p className='text-lg font-bold text-richblack-5'>Statistics</p>
                        <div className='mt-4 space-y-4'>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Courses</p>
                                <p className='text-3xl font-semibold text-richblack-50'>{courses?.length}</p>
                            </div>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Students</p>
                                <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
                            </div>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Earnings</p>
                                <p className='text-3xl font-semibold text-richblack-50'>₹ {totalEarnings}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rounded-md bg-richblack-800 p-6'>
                <div className='flex items-center justify-between'>
                    <p className='text-lg font-bold text-richblack-5'>Your Courses</p>
                    <button onClick={()=>{
                        navigate('/dashboard/my-courses')
                    }} className='text-xs font-semibold text-yellow-50'>View all</button>
                </div>
                <div className='my-4 flex space-x-6'>
                    { courses?.length === 0 ? <p className='text-sm font-medium text-richblack-300'>You have not created any courses yet</p>
                        :
                        courses?.slice(0,3)?.map((course, index) => {
                            return (
                                <div key={index} className='w-1/3'>
                                    <img src={course?.thumbnail} alt="course" className=' aspect-video md:h-[201px] w-full rounded-md object-cover' />
                                    <div className='mt-3 w-full'>
                                        <p className='text-sm font-medium text-richblack-50'>{course?.courseName}</p>
                                        <div className='mt-1  md:space-x-2 md:flex'>
                                            <p className='text-xs font-medium text-richblack-300'>{course?.studentsEnrolled?.length} Students
                                            </p>
                                            <p className='hidden md:block text-xs font-medium text-richblack-300'>|</p>
                                            <p className='text-xs font-medium text-richblack-300'>₹ {course?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorDashboard
