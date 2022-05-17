const API_URL = 'https://localhost:7162/api/Student';
const getStudents = async () => {
    try{
        const response = await fetch(
           API_URL,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            }
        );

        if(response.ok){
            const students = await response.json();
            const studentsTemplate = document.getElementById('studentsTemplate');

            let templateHtml = "";
            students.forEach(student => {
                templateHtml += `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.birthDate}</td>
                        <td>${student.course}</td>
                        <td>
                            <a id="editStudent-${student.id}" class="text-warning">Editar</a> |
                            <a id="deleteStudent-${student.id}" class="text-danger">Eliminar</a>
                        </td>
                    </tr>
                `;
            });
            studentsTemplate.innerHTML = templateHtml;
            setStudentsEventListeners(students);
        }
    }catch(error){
        console.log(error);
        swal('Error', JSON.stringify(error), 'error');
    }
}

const setStudentsEventListeners = (students) => {
    students.forEach(student=>{
        document.getElementById(`editStudent-${student.id}`).addEventListener('click', () =>{
            document.getElementById('studentId').value = student.id;
            document.getElementById('name').value = student.name;
            document.getElementById('birthdate').value = new Date(student.birthDate).toISOString().substring(0, 10);
            document.getElementById('course').value = student.course;
        });

        document.getElementById(`deleteStudent-${student.id}`).addEventListener('click', () =>{
            swal({
                title: "Confirmar eliminación",
                text: "¿Estás seguro que quieres eliminar este estudiante?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then(async (deleteConfirmed) => {
                try{
                    if(deleteConfirmed){
                        const response = await fetch(`${API_URL}/${student.id}`, {
                            method: 'DELETE',
                            headers: {
                                'content-type': 'application/json'
                            }
                        });
                        if(response.ok){
                            swal('Éxito', 'Estudiante eliminado correctamente', 'success');
                            getStudents();
                        }
                    }
                }catch(error){
                    swal('Error', error, 'error');
                }
              });
        });
    });
}

getStudents();


document.getElementById('cancelSaveStudentBtn').addEventListener('click', () => {
    document.getElementById('studentsForm').reset();
    document.getElementById('studentId').removeAttribute('value');
});

document.getElementById('saveStudentBtn').addEventListener('click', async () => {
    try{    
        const newStudent = {
            name: document.getElementById('name').value,
            birthDate: document.getElementById('birthdate').value,
            course: document.getElementById('course').value
        };

        const studentId = document.getElementById('studentId').value;

        if(studentId) newStudent.id = studentId;
        const method = (studentId) ? 'PUT' : 'POST';
        const response = await fetch(
            API_URL,
            {
                method: method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            }
        );
        if(response.ok){
            const savedStudent = await response.json();

            if(savedStudent){
                swal('Éxito', 'Cambios guardados correctamente', 'success');
                document.getElementById('cancelSaveStudentBtn').click();
                getStudents();
            }
        }
    }catch(error){
        swal('Error', error, 'error');
    }
});

const validateNameField = () =>{
    const nameField = document.getElementById('name');
    if(nameField.value.length === 0){
        nameField.classList.add('is-invalid');
        document.getElementById('name-error').innerText = "El nombre es obligatorio";
        document.getElementById('saveStudentBtn').disabled = true;
        document.getElementById('saveStudentBtn').setAttribute('disabled', 'true');
    }else if(nameField.value.length > 255){
        nameField.classList.add('is-invalid');
        document.getElementById('name-error').innerText = "El nombre no puede contener más de 255 carácteres";
        document.getElementById('saveStudentBtn').disabled = true;
        document.getElementById('saveStudentBtn').setAttribute('disabled', 'true');
    }else{
        nameField.classList.remove('is-invalid');
        nameField.classList.add('is-valid');
        document.getElementById('name-error').innerText = "";
        document.getElementById('saveStudentBtn').disbaled = false;
        document.getElementById('saveStudentBtn').removeAttribute('disabled');
    }
}

document.getElementById('name').addEventListener('focusout', validateNameField);
document.getElementById('name').addEventListener('keyup', validateNameField);

const validatebirthDateField = () => {
    const birthDateField = document.getElementById('birthdate');
    if(birthDateField.value.length === 0){
        birthDateField.classList.add('is-invalid');
        document.getElementById('birthdate-error').innerText = "La fecha de nacimiento es obligatoria";
        document.getElementById('saveStudentBtn').disabled = true;
        document.getElementById('saveStudentBtn').setAttribute('disabled', 'true');
    }else{
        birthDateField.classList.remove('is-invalid');
        birthDateField.classList.add('is-valid');
        document.getElementById('birthdate-error').innerText = "";
        document.getElementById('saveStudentBtn').disbaled = false;
        document.getElementById('saveStudentBtn').removeAttribute('disabled');
    }
}

document.getElementById('birthdate').addEventListener('focusout', validatebirthDateField);
document.getElementById('birthdate').addEventListener('keyup', validatebirthDateField);

const validateCourseField = () => {
    const courseField = document.getElementById('course');
    if(courseField.value.length === 0){
        courseField.classList.add('is-invalid');
        document.getElementById('course-error').innerText = "El curso es obligatorio";
        document.getElementById('saveStudentBtn').disabled = true;
        document.getElementById('saveStudentBtn').setAttribute('disabled', 'true');
    }else if(courseField.value.length > 255){
        courseField.classList.add('is-invalid');
        document.getElementById('course-error').innerText = "El curso no puede contener más de 255 carácteres";
        document.getElementById('saveStudentBtn').disabled = true;
        document.getElementById('saveStudentBtn').setAttribute('disabled', 'true');
    }else{
        courseField.classList.remove('is-invalid');
        courseField.classList.add('is-valid');
        document.getElementById('course-error').innerText = "";
        document.getElementById('saveStudentBtn').disbaled = false;
        document.getElementById('saveStudentBtn').removeAttribute('disabled');
    } 
}

document.getElementById('course').addEventListener('focusout', validateCourseField);
document.getElementById('course').addEventListener('keyup', validateCourseField);