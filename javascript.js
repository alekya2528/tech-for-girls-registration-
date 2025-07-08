let shareCount = 0;
const shareBtn = document.getElementById('whatsappBtn');
const counter = document.getElementById('clickCounter');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('registrationForm');
const finalMessage = document.getElementById('finalMessage');

// ✅ FIELD COMPLETION COUNTER START
const fields = ['name', 'phone', 'email', 'college'];
const fieldCounter = document.getElementById('fieldCounter');

let completedFields = {};

fields.forEach(fieldId => {
  const input = document.getElementById(fieldId);

  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      completedFields[fieldId] = true;
    } else {
      delete completedFields[fieldId];
    }

    fieldCounter.textContent = `Fields completed: ${Object.keys(completedFields).length}/4`;
  });
});
// ✅ FIELD COMPLETION COUNTER END

// WhatsApp share button logic
shareBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;
    counter.textContent = `Click count: ${shareCount}/5`;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    window.open(`https://wa.me/?text=${message}`, '_blank');

    if (shareCount === 5) {
      shareBtn.disabled = true;
      submitBtn.disabled = false;
      counter.textContent = "Sharing complete. Please continue.";
    }
  }
});

// Submit handler (same as before)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const file = document.getElementById('screenshot').files[0];

  if (shareCount < 5) {
    alert("Please complete sharing first.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("file", file);

  const response = await fetch("https://script.google.com/macros/s/AKfycbx3QJtP2agujE0k_JwQK3t2lhueaXAxWYoHhKUk6epiDy47oMqU_fZRF4XayYMq6eWC/exec", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.status === 'success') {
    finalMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    localStorage.setItem('submitted', 'true');
    form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  } else {
    alert("Something went wrong. Please try again.");
  }
});
