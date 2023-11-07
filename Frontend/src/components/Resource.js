import React, { useEffect, useState } from 'react'
import Sideb from '../components/Sideb'
import Resourcecard from '../components/Resourcecard'
import Facultyresourcecard from '../components/Facultyresourcecard'
import toast from 'react-hot-toast';
const BASE_URL = process.env.BASE_URL;


const Resource = () => {
 const em = localStorage.getItem('email');
const [name,setname] = useState('');
const token = localStorage.getItem('token');
const dummytags = ['DAA' , 'CD' , 'AI' , 'IOT' , 'IP','CN','DC','OS','DBMS']
const [role,setrole]= useState('student');


    const getprofile = async (e) => {
    // login
 try{ 
   console.log("gp called")
    // const loadToast = toast.loading("Hang Up!");
      const response = await fetch(`http://localhost:4000/getProfile`,{
       method:'POST',
       body:JSON.stringify({
         email:em,
         token:token
       }),
       headers:{
         'Content-type': 'application/json; charset=UTF-8'       }
      })
      
      const data = await response.json();
     
     
      setTimeout(() => {
       // toast.dismiss(loadToast)
      }, 1000);
      
      
      
      if(response.ok)
      { 
       
        console.log(data.user);
         setid(data.user._id);
         setrole(data.user.role);
         setname(data.user.name);
        
      }
      else
      {
      setTimeout(()=>{toast.error(data.message)},1000);
      
      }
    }
    catch(e)
    {
      console.log("error at profile fetch - "+e);
    }
  };
  
  useEffect(()=>{getprofile()},[])
  

const [id,setid] = useState('');
const [resdata, setresdata] = useState([]);
const [difficulty,setdifficulty] = useState('beginner');
const [imgurl,setimgurl]=useState('');
const [title,settitle] = useState('');
const [author,setauthor] = useState('');
const [tags,settags]= useState([]);
const [description,setdescription] =useState('')
const [links, setlinks] = useState([]);
const [li,setli] = useState('');
const [sem,setsem]=useState('');

const LinkHandler = (link)=>{  
  
   setlinks([...links,link])
  // console.log(links)
  setli('')
}

const handleTagChange = (e) => {
  const selectedTag = e.target.value;
  settags((prevTags) => {
    if (!prevTags.includes(selectedTag)) {
      return [...prevTags, selectedTag];
    }
    return prevTags; // Return the existing state if the tag is already in the array
  });
  console.log(tags);
};


const linkDeleter = (id)=>{
   console.log(id);
   const newlist = links.filter((link,index)=>{ return index !== id})
  // console.log(newlist)
  setlinks(newlist);
}
//useEffect(()=>{console.log(li)},[li])

/*const getResources = async()=>{
 try{
    const response = await fetch(`http://localhost:5000/fetchResources`, {
    method: 'GET', // HTTP request method
   headers: {
    'Content-Type': 'application/json', 
     
   },
    body: JSON.stringify({
      role: role,
      id:id
    })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
      console.log(data);
     
     setresdata(data);
    
 } 
 catch(e)
 {  
   
    console.error('Fetch error at resource fetch:', e);
 }
}
*/
const [files,setfiles] = useState([]);

const uploadFiles = async () => {
  const inputElement = document.getElementById('dropzone-file');
  const formData = new FormData();
  const load = toast.loading('Uploading files');

  if (inputElement.files.length === 0) {
    // Handle the case where no files are selected.
    toast.error('No files selected');
    toast.dismiss(load); // Dismiss the loading toast
    return;
  }

  for (let i = 0; i < inputElement.files.length; i++) {
    formData.append('files', inputElement.files[i]);
  }

  try {
    const response = await fetch('http://localhost:4000/fileupload', {
      method: 'POST',
      body: formData,
    });
 const data = await response.json();
 console.log(data);
    if (response.ok) {
     toast.success("File uploaded successfully!!");
      if (data.uploadedFiles) {
        let temp = data.uploadedFiles.map((file) => file.fileURL);
        setfiles(temp);
      }
      toast.dismiss(load); // Dismiss the loading toast
    } else {
      toast.error('File upload failed');
      console.error('File upload failed');
    }
  } catch (error) {
    toast.error('Error during file upload');
    console.error('Error during file upload:', error);
  }
};


// document.addEventListener('DOMContentLoaded', function () {

// });
// Add an event listener to call the uploadFiles function when the input changes



const postResource = async()=>{
try
{   
   console.log(
   {
    links,difficulty,description,title,tags,name,sem,files
   }
   )
   const response = await fetch(`http://localhost:4000/createResource` , {
    method: 'POST', // HTTP request method
   headers: {
    'Content-Type': 'application/json', 
   },
   
     body:JSON.stringify(
       {
      id:id,
    token:token,
    link:tags,
   difficulty:difficulty,
   desc:description,
   files:files,
   semester:sem,
   title:title,
   tags:tags,
   author:name
}
     )
   })
   
       const data = await response.json();
       if(response.ok)
       { 
        toast.success('Resource uploaded successfully')
       }
       console.log(data);
}
catch(e)
{
   console.log('error while posting resource : '+e)
}
}

const dummyData = [
{ 
  title : 'Operating system module 1',
  i:'https://img.freepik.com/free-photo/public-examination-preparation-concept_23-2149369870.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1698883200&semt=ais',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'IOT module 5',
  i:'https://img.freepik.com/premium-vector/iot-internet-things-devices-connectivity-concepts-network-flat-style-with-people_194782-1655.jpg',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'Operating systems module 2',
  i:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0hzZQ_ZgZQa09fQLKnrsL37fX0hgI3Z15g&usqp=CAU',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'This is title',
  i:'https://picsum.photos/seed/picsum/200/300',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'This is title',
  i:'https://picsum.photos/seed/picsum/200/300',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
},
{ 
  title : 'This is title',
  i:'https://picsum.photos/seed/picsum/200/300',
  desc:'By following these steps, you can handle click events on the buttons and define the logic you want to execute when a button is clicked.'
}
]

//useEffect(()=>{getResources()},[]);

const [active,setactive] = useState(0);
const [ftab,setftab]=useState(2);

const handleInputChange = (event) => {
    setli(event.target.value); // Update the state with the input value
  };

const filterBytag = (tag)=>{
}

  return (
    <div className='flex min-h-screen'>
     <Sideb></Sideb>
     <div className='p-2 px-5 flex flex-col'> 
     {
       role==="student" &&
        <div> 
        <div className=' w-[100%] text-xl mt-2 font-bold  mb-4'>YOUR SAVED RESOURCES</div>
        <div className='flex flex-wrap gap-2 mb-2'>
        {
           dummytags.map((tag,ind)=>{return (
    <button
      className={`${
        active === ind ? "bg-blue-700 border-white" : "bg-blue-400"
      } text-white font-bold p-2 rounded-lg min-w-[50px]`}
      key={ind}
      onClick={() =>(setactive(ind),filterBytag(tag))} // Add an onClick event here
    >
      {tag}
    </button>
  );})
         }
    </div>
        <div className='flex flex-col gap-3'>
         {
           dummyData.map((resource,ind)=>{return <Resourcecard title={resource.title} i={resource.i} desc={resource.desc} key={ind} ></Resourcecard>})
          }
        </div>
         
        </div>
     }
     
     
     {
      role === "faculty" && 
      <div className=' md:w-[500px] lg:w-[1000px] '>
      
       <div>
      <div className='w-[100%] text-xl mt-2 font-bold  mb-4'>Your Resources</div>
      <div className='flex flex-wrap gap-3 bg-slate-800 items-center rounded-lg p-2 mb-5 w-full'>
      <button className={` ${ftab ===1 ?'bg-blue-800':'bg-transparent'} font-bold text-white p-2 rounded-lg`} onClick={()=>{setftab(1)}} >published</button>
      <button className={` ${ftab ===2 ?'bg-blue-800':'bg-transparent'} font-bold text-white p-2 rounded-lg`} onClick={()=> {setftab(2)}}>Create a new</button>      
      </div>
      </div>      
      </div>
     }
      {/**for list */}
     {
      role === "faculty" && ftab===1 && 
       <div>
       {
        dummyData.map((data,ind)=>{return <Facultyresourcecard key={ind} data={data}></Facultyresourcecard>})
       }
       </div>
       
      }
       {/**for resource form */}
     {
        role==="faculty" && ftab===2 && 
        <div>
        {
         
         <div className='flex flex-col rounded-lg drop-shadow-xl gap-4  p-3'>
         <div className='flex gap-5 w-full '>
         <div className='uppercase font-bold'>Title</div>
         <input onChange={(e)=>{settitle(e.target.value)}} type='text' className='rounded-md outline-none w-full'></input>
         </div>
         <div className='flex gap-5 w-full flex-wrap justify-between'>
             <div className='uppercase font-bold'>Difficulty Rating</div>
              <div className='flex flex-wrap gap-3 bg-blue-100'>
              <div className={` rounded-lg px-1 cursor-pointer`} onClick={()=>{setdifficulty('beginner')}}>Beginner</div>
              <div onClick={()=>{setdifficulty('intermediate')}} className=' rounded-lg px-1 cursor-pointer'  >Intermediate</div>
              <div onClick={()=>{setdifficulty('advanced')}} className=' rounded-lg px-1 cursor-pointer' >Advanced</div>
              </div>
         </div>
         <div className='flex justify-between gap-3' >
         <div className='uppercase font-bold'>Add the description</div>
         <textarea onChange={(e)=>{setdescription(e.target.value)}} className='w-full'></textarea>
         </div>
         <div className='flex flex-wrap justify-between gap-3'>
          <div className='flex gap-5 flex-wrap justify-between items-center'>
         
         {/* <div className='uppercase font-bold'>Select Semester</div> */}
         {/* <select className='p-1 w-[100px]' onChange={(e) => setsem(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, ind) => {
          return <option value={item} key={ind}>{item}</option>;
          })}
          </select> */}
          
          <div className='flex gap-5 flex-wrap justify-between items-center'>
  <div className='uppercase font-bold'>Select Semester</div>
  <select className='p-1 w-[100px]' onChange={(e) => setsem(e.target.value)}>
    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, ind) => {
      return <option value={item} key={ind}>{item}</option>;
    })}
  </select>
</div>  


         </div>
  
         <div className='flex gap-5 items-center flex-wrap justify-between'>
         <div className='uppercase font-bold' >Select tag</div>
        <select className='p-1 w-[100px]' onChange={handleTagChange}>
        {
          dummytags.map((item, ind) => {
             return <option value={item} key={ind}>{item}</option>;
           })
       }
       </select>
         </div>
         </div>
        
            <div className='font-bold uppercase'>Add the links to references</div>
            
         <div className='flex justify-between gap-3'>
          <input type='text' className='w-full indent-2' value={li}  onChange={handleInputChange}  ></input>
          <div className='bg-green-500 text-white font-bold p-2 px-4 rounded-md cursor-pointer' onClick={()=>LinkHandler(li)}>Add</div>
         </div>   
          {links.length!==0 && <div className='flex flex-col gap-2'>{
              links.map((elem,index)=>{return <div className='flex justify-between '><div key={index} >{elem} </div><div className=' text-white bg-red-600 rounded-md p-1 cursor-pointer' onClick={()=>{linkDeleter(index)}}>delete</div></div>})
          }</div>}
          
          <div className='font-bold uppercase'>Upload the files</div>
          
        <div className='fileupload'> 
  <div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-300">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-2 text-sm text-gray-900 dark:text-gray-490"><span className="font-semibold">Click to upload</span></p>
        <p className="text-xs text-gray-900 dark:text-gray-900">PNG, JPG, PDF, or DOCX</p>
      </div>
      <input id="dropzone-file" type="file" className="hidden" onChange={()=>{uploadFiles()}} multiple />
    </label>
  </div> 
</div>
          
          <button onClick={()=>{postResource()}} className='bg-green-600 translate-x-6 md:translate-x-36 lg:translate-x-96 font-bold text-white p-2 rounded-md w-[200px]'>Create</button>
         </div>
         
           
        }
        </div>
     }
     
     </div>
     
    </div>
  )
}

export default Resource