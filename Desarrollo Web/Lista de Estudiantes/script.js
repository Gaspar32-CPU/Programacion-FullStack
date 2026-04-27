const estudiantes = [
    { nombre: "Ana", fechaNacimiento: "2005-04-12", edad: 18 },
    { nombre: "Carlos", fechaNacimiento: "2006-09-30", edad: 17 },
    { nombre: "Lucía", fechaNacimiento: "2005-12-05", edad: 18 },
    { nombre: "Miguel", fechaNacimiento: "2007-01-20", edad: 16 }
];

const studentTableBody = document.getElementById("studentTableBody");
const addStudentBtn = document.getElementById("add-student-btn");
const containerList = document.getElementById("container-list");
const containerForm = document.getElementById("container-form");
const showStudentsBtn = document.getElementById("show-students-btn");
const addStudentForm = document.getElementById("addStudentForm");



showStudents();

function areStudentsDisplayed() {
    return document.querySelectorAll(".student-row").length > 0;
}

function showStudents() {
    containerList.style.display = 'block';
    containerForm.style.display = 'none';
    addStudentBtn.disabled = false;
    
    studentTableBody.innerHTML = "";
    
    const countEstudiantes = estudiantes.length;
    for (let i = 0; i < countEstudiantes; i++) {
        const row = document.createElement("tr");
        row.classList.add("student-row");

        row.innerHTML = `
            <td>${estudiantes[i].nombre}</td>
            <td>${estudiantes[i].fechaNacimiento}</td>
            <td>${estudiantes[i].edad}</td>
        `;

        studentTableBody.appendChild(row);
    }
}

if (showStudentsBtn) {
    showStudentsBtn.addEventListener("click", showStudents);
}

function areFormDisplayed() {
    return document.querySelectorAll(".student-row").length > 0;
}

function addStudent() {
    containerList.style.display = 'none';
    containerForm.style.display = 'block';
    showStudentsBtn.disabled = false;
    if (areFormDisplayed()) {
        addStudentBtn.disabled = true;
    }
}

addStudentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const fechaNacimiento = document.getElementById("fnacimiento").value;

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const cumplioAnios = (hoy.getMonth() > nacimiento.getMonth()) ||
                        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
    
    var edad;
    if (cumplioAnios) {
        edad = hoy.getFullYear() - nacimiento.getFullYear();
    } else {
        edad = hoy.getFullYear() - nacimiento.getFullYear() - 1;
    }
    const nuevoEstudiante = {
        nombre: nombre,
        fechaNacimiento: fechaNacimiento,
        edad: edad
    };
    
    estudiantes.push(nuevoEstudiante);
    
    document.getElementById("nombre").value = "";
    document.getElementById("fnacimiento").value = "";
    
    alert("Estudiante agregado exitosamente");
    
    showStudents();
});
