// Global State
let buddies = [];

//  DOM References
const buddyList = document.getElementById('buddy-list');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-search');
const subjectSelect = document.getElementById('subject-filter');
const experienceSelect = document.getElementById('experience-filter');
const timezoneSelect = document.getElementById('timezone-filter');

//  Fetch from Supabase Backend
async function fetchBuddies() {
  try {
    const response = await fetch('http://localhost:8080/mockDataSet');
    const data = await response.json();
    buddies = data;

    // Populate dropdowns + render all
    populateDropdown(buddies, "preferred_subjects", "subject-filter", "All Subjects");
    populateDropdown(buddies, "experience_level", "experience-filter", "All Levels");
    populateDropdown(buddies, "timezone", "timezone-filter", "All Timezones");

    renderBuddies(buddies);
  } catch (err) {
    console.error('Failed to fetch buddies:', err);
  }
}

//  Populate Filter Dropdowns
function populateDropdown(data, key, selectId, defaultLabel) {
  const select = document.getElementById(selectId);
  const uniqueValues = new Set();

  data.forEach(entry => {
    const value = entry[key]?.trim();
    if (value) uniqueValues.add(value);
  });

  select.innerHTML = `<option value="">${defaultLabel}</option>`;

  [...uniqueValues].sort().forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

//  Render Logic
function renderBuddies(list) {
  buddyList.innerHTML = '';

  if (list.length === 0) {
    noResults.style.display = 'block';
    return;
  } else {
    noResults.style.display = 'none';
  }

  list.forEach(buddy => {
    const card = document.createElement('div');
    card.classList.add('buddy-card');
    card.innerHTML = `
      <div class="avatar">👤</div>
      <div class="buddy-info">
        <h3>${buddy.student_name}</h3>
        <p><strong>Subject:</strong> ${buddy.preferred_subjects}</p>
        <p><strong>Study Style:</strong> ${buddy.study_style}</p>
        <p><strong>Experience:</strong> ${buddy.experience_level}</p>
        <p><strong>Timezone:</strong> ${buddy.timezone}</p>
        <p><strong>Available:</strong> ${buddy.days_of_wk_avail}</p>
        <button class="message-btn">Message</button>
      </div>
    `;
    buddyList.appendChild(card);
  });
}

//  Filter Logic
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedSubject = subjectSelect.value.toLowerCase();
  const selectedExperience = experienceSelect.value.toLowerCase();
  const selectedTimezone = timezoneSelect.value.toLowerCase();

  const filtered = buddies.filter(student => {
    const subject = student["preferred_subjects"]?.toLowerCase() || '';
    const availability = student["study_times"]?.toLowerCase() || '';
    const experience = student["experience_level"]?.toLowerCase() || '';
    const timezone = student["timezone"]?.toLowerCase() || '';

    const matchesSearch = subject.includes(searchTerm) || availability.includes(searchTerm);
    const matchesSubject = !selectedSubject || subject === selectedSubject;
    const matchesExperience = !selectedExperience || experience === selectedExperience;
    const matchesTimezone = !selectedTimezone || timezone === selectedTimezone;

    return matchesSearch && matchesSubject && matchesExperience && matchesTimezone;
  });

  renderBuddies(filtered);
}

//  Event Listeners
searchInput.addEventListener('input', applyFilters);
subjectSelect.addEventListener('change', applyFilters);
experienceSelect.addEventListener('change', applyFilters);
timezoneSelect.addEventListener('change', applyFilters);
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  subjectSelect.value = '';
  experienceSelect.value = '';
  timezoneSelect.value = '';
  renderBuddies(buddies);
});

// ✅ Initialize
fetchBuddies();
