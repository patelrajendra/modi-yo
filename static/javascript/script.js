let formdata=document.getElementById('myform');
formdata.addEventListener('submit',validate);
let cnme=document.getElementById('comname')

async function validate(event){
     event.preventDefault();
     const firstName=document.getElementById('firstName').value
     const middleName=document.getElementById('middleName').value
     const lastName=document.getElementById('lastName').value
     const collegeId=document.getElementById('clgid-field').value
     const email=document.getElementById('email-field').value
     const state=document.getElementById('state').value
     const district=document.getElementById('district').value
     const city=document.getElementById('city').value
     const password=document.getElementById('pass-field').value
     const confirmPassword=document.getElementById('cnfpass-field').value
     const siblings=document.getElementById('siblings').value
     const gender=document.getElementById('gender-field').value
     const disablity=document.getElementById('phydis-field').value

     await fetch('/sign',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstName,
            middleName,
            lastName,
            collegeId,
            email,
            state,
            district,
            city,
            password,
            confirmPassword,
            siblings,
            gender,
            disablity
        })
    }).then(res=>res.json())
     .then(data=>{
        if(data.status==='ok'){
            console.log('done');
            formdata.innerHTML="Thanks for filling form .Now you are are the member of Masam"
            formdata.style.color='chartreuse';
            formdata.style.backgroundColor='black'
            formdata.style.textAlign='center';
            formdata.style.fontSize='2.3rem';
            comname.style.display='none';
            alert('submitted succesfully');
        }
        else{
            alert(data.error);
        }
     })
   
    //console.log(result);
}