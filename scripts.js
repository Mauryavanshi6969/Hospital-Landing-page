document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const patientQueueDiv = document.getElementById('patient-queue');
    const evaluationResultsPre = document.getElementById('evaluation-results');

    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fileInput = document.getElementById('data-file');
        if (fileInput.files.length === 0) {
            alert('Please select a file to upload.');
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {  
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            updatePatientQueue(data.patientQueue);
            updateEvaluationResults(data.evaluationResults);
        })
        .catch(error => console.error('Error:', error));
    });

    function updatePatientQueue(patientQueue) {
        patientQueueDiv.innerHTML = '';
        patientQueue.forEach(patient => {
            const patientDiv = document.createElement('div');
            patientDiv.className = 'patient';
            patientDiv.innerHTML = `<strong>ID:</strong> ${patient.id} <strong>Level:</strong> ${patient.level}`;
            patientQueueDiv.appendChild(patientDiv);
        });
    }

    function updateEvaluationResults(results) {
        evaluationResultsPre.textContent = JSON.stringify(results, null, 2);
    }
});
