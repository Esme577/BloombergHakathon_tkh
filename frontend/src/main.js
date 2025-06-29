

async function loadPersons() {
  try {
    const resp = await fetch("http://localhost:8080/mockDataSet");
    const data = await resp.json()
    console.log(data);

    const personsGrid = createGrid(data);
    const app = document.getElementById("app");
    //New code. Clears out the inside of the element.
    app.innerHTML = '';
    app.appendChild(personsGrid); 
  } catch (err) {
    console.log(err)
  }
}

document.addEventListener("DOMContentLoaded", async function(){
  await loadPersons();
})

function createGrid(data) {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'grid-container';
  console.log(data)
  // Create grid header
  const header = document.createElement('h1');
  header.textContent = 'Users';
  gridContainer.appendChild(header);
  
  
  // Create the grid
  const grid = document.createElement('div');
  grid.className = 'user-grid';
  
  // Create grid items for each person
  data.forEach(person => {
    console.log(person)
    const card = document.createElement('div');
    card.className = `user-card role-${person.student_name.toLowerCase()}`;
    
    // Create name element
    const name = document.createElement('h3');
    name.textContent = person.student_name;
    card.appendChild(name);
    
    // Create subject element
    const subject = document.createElement('p');
    subject.className = 'user-subject';
    subject.textContent = person.preferred_subjects;
    card.appendChild(subject);

    // Create available element
    const available = document.createElement('p');
    available.className = 'user-subject';
    available.textContent = person.study_times;
    card.appendChild(available);

    // Create days element
    const days = document.createElement('p');
    days.className = 'user-subject';
    days.textContent = person.days_of_wk_avail;
    card.appendChild(days); 

    // Create Timezone element
    const timezone = document.createElement('p');
    timezone.className = 'user-subject';
    timezone.textContent = person.timezone;
    card.appendChild(timezone); 
    
    // Create Experience badge
    const experience = document.createElement('span');
    experience.className = 'user-experience';
    experience.textContent = person.experience_level;
    card.appendChild(experience);
    
    grid.appendChild(card);
  });
  
  gridContainer.appendChild(grid);
  return gridContainer;
}


/////////////////submit info from form 

document.getElementById('userForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nameEl = document.getElementById('student_name');
  const idEl = document.getElementById('student_id');
  const subjectsEl = document.getElementById('preferred_subjects');
  const timeEl = document.getElementById('study_times');
  const personalityEl = document.getElementById('personality_type');
  const styleEl = document.getElementById('study_style');
  const timezoneEl = document.getElementById('timezone');
  const daysEl = document.getElementById('days_of_wk_avail');
  const experienceEl = document.getElementById('experience_level');
  const gpaEl = document.getElementById('GPA');

 
  const student_name = nameEl.value
  const  student_id = idEl.value;
  const preferred_subjects = subjectsEl.value;
  const study_times = timeEl.value;
  const  personality_type = personalityEl.value;
  const  study_style = styleEl.value;
  const  timezone = timezoneEl.value;
  const days_of_wk_avail = daysEl.value;
  const experience_level = experienceEl.value;
   const  GPA =gpaEl.value;

  // Prepare data for submission
  const userData = {
    student_name,
    student_id,
    preferred_subjects,
    study_times,
    personality_type,
    study_style,
    timezone,
    days_of_wk_avail,
    experience_level,
    GPA
  };

  // Here you would typically send the data to your server
  console.log('Submitting user data:', userData);

  try {
    const resp = await fetch('http://localhost:8080/mockDataSet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })

    if (resp.status != 201){
      throw new Error("Failed to create new person")
    }

    await loadPersons();

    // Reset the fields to a default value
    nameEl.value = "";
    idEl.value = "";
    subjectsEl.selectedIndex = -1;
    timeEl.value = "";
    personalityEl.value = "";
    styleEl.value = "";
    timezoneEl.value = "";
    daysEl.selectedIndex = -1;
    experienceEl.value = "";
    gpaEl.value = "";

    window.location.href = "3rd.html";
  } catch(err){
    console.error('Error:', error);
    alert('Error creating user');
  }
});
