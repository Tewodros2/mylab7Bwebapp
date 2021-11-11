window.onload = async function () {
    await displayUserInHtml();
    document.getElementById('refesh').onclick = async function () {
        await displayUserInHtml();
    }

}

async function fetchSingleUser() {
    let dataDisplay = await fetch('https://randomuser.me/api/');
    let json = await dataDisplay.json();
    return json.results[0];
}

async function fetchUsers(length) {
    const employeeData = [];
    for (let i = 0; i < length; i++) {
        employeeData.push(await fetchSingleUser());
    }
    return employeeData;
}
async function displayUserInHtml() {
    const employeeDiv = document.getElementById('employee-list');
    employeeDiv.innerHTML = '';
    const userArr = await fetchUsers(5);
    userArr.forEach(emp => {
        let fileDispaly = ` 
          <div class="container" style="display: flex;flex:2; gap: 20px;">    
            <div class="image" style=" gap: 20px; margin-bottom: 20px;" > <img src="${emp.picture.large}" /> </div>
            <div class="data" style="justify-content: flex-end;"> <b>${emp.name.first} ${emp.name.last}</b>
                <p>phone: ${emp.phone}</p><p>${emp.email}</p> </div></div>   
        `;
        const display = document.createElement('div');
        display.innerHTML = fileDispaly;
        employeeDiv.appendChild(display);
    });
}
