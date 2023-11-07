import {useLocation} from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import Calendar from 'moedim';
import {LuBookOpenCheck} from 'react-icons/lu'
import {SiGoogleclassroom} from 'react-icons/si'
import {FaAccessibleIcon, FaRegClock} from 'react-icons/fa'
import {LiaUserFriendsSolid} from 'react-icons/lia'
import {useState} from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);
 export default function Dashboard(props) {
    const location = useLocation();
    const pieval = {
        datasets: [{
            data: [10, 20, 30]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    }
    // console.log(location)
    const [currclass,setCurrclass] = useState("Sem 5 CSE")
    const data = useSelector((state) => state.name.name);
    console.log("name is ",data);
    const name = data.payload || "Jay Chatpalliwar"

    // let token = localStorage.getItem("token");

    // if(token === null || token === undefined)
        
    return (
        <div className="dashboard flex flex-col justify-end h-[590px] w-full mx-5 my-8 relative overflow-hidden bg-[#FFFBF5]">

            <div className='flex flex-row justify-between font-bold items-center mr-4'>
            <div className='text-2xl text-slate-800'>
            Welcome, {props.user}
            </div>
            <div>
                {currclass}
            </div>
            </div>

            <div
             className='w-screen h-screen flex flex-row gap-x-12'
            >
            <div class>
            <div className=' rounded-lg mt-6'>
                <span className='opacity-80'>Overview</span>
                <div className='bg-[#F7EFE5] flex flex-col rounded-lg gap-4 p-8'>
                    <div className='text-[30px] max-w-[350px] font-bold opacity-80 text-slate-900'>
                        Continue to upgrade your knowledge and experience
                    </div>
                    <div className='flex flex-row flex-wrap w-[100%] justify-between gap-y-8'>
                        <div className='flex flex-col relative p-4 rounded-lg w-[40%] bg-[#EBF3E8]'>
                            <div className='text-2xl font-bold tex-slate-800 opacity-90'>05</div>
                            <div className='text-sm text-slate-400 font-semibold'>Classes in Progress</div>
                            <SiGoogleclassroom className='absolute top-[24%] right-2  text-[40px]'/>
                        </div>
                        <div className='flex flex-col relative p-4 rounded-lg w-[40%] bg-gray-100'>
                            <div className='text-2xl font-bold tex-slate-800 opacity-90'>50+</div>
                            <div className='text-sm text-slate-400 font-semibold'>Resources Available</div>
                            <LuBookOpenCheck className='absolute top-[24%] right-2  text-[40px]'/>
                        </div>
                        <div className='flex flex-col relative p-4 rounded-lg w-[40%] bg-gray-100'>
                            <div className='text-2xl font-bold tex-slate-800 opacity-90'>6+hrs</div>
                            <div className='text-sm text-slate-400 font-semibold'>Read Time</div>
                            <FaRegClock className='absolute top-[24%] right-2  text-[40px]'/>
                        </div>
                        <div className='flex flex-col relative p-4 rounded-lg w-[40%] bg-gray-100'>
                            <div className='text-2xl font-bold tex-slate-800 opacity-90'>127</div>
                            <div className='text-sm text-slate-400 font-semibold'>BatchMates</div>
                            <LiaUserFriendsSolid className='absolute top-[24%] right-2  text-[40px]'/>
                        </div>

                        
                    </div>
                </div>
            </div>
                
            </div>
            <Calendar className="react-calendar h-[75%] mt-12"></Calendar>
            </div>


            <div>
        <div>
        {/* <Pie data = {pieval}/> */}
        </div>
        
        <div>

        </div>
            </div>
{/* 
            <div>
        rest of the Dashboard
            </div> */}



        </div>
    )
}