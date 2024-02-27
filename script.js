const taskForm = document.getElementById('task-form-submit'); // Ensure this is the form ID, not the submit button.
const taskList = document.getElementById('task-list-items');

// Function to create a new task list item
function createTaskItem(task) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    if (task.completed) {
        listItem.classList.add('completed');
    }

    // Checkbox for completion status
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
        task.completed = this.checked;
        listItem.classList.toggle('completed');
    });

    // Title
    const title = document.createElement('span');
    title.classList.add('title');
    title.textContent = task.title;

    // Description
    const description = document.createElement('p');
    description.textContent = task.description;

    // Category
    const category = document.createElement('span');
    category.classList.add('category');
    category.textContent = `Category: ${task.category}`;

    // Deadline
    const deadline = document.createElement('span');
    deadline.classList.add('deadline');
    deadline.textContent = `Deadline: ${task.deadline}`;

    // Priority
    const priority = document.createElement('span');
    priority.classList.add('priority');
    priority.textContent = `Priority: ${task.priority}`;
    priority.className += task.priority === 'high' ? ' high-priority' : task.priority === 'medium' ? ' medium-priority' : '';

    // Labels
    const labels = document.createElement('span');
    labels.classList.add('labels');
    labels.textContent = `Labels: ${task.labels.join(', ')}`;

    // Progress
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.style.width = `${task.progress}%`;
    progressBar.appendChild(progress);

    // Append elements
    listItem.append(checkbox, title, description, category, deadline, priority, labels, progressBar);
    return listItem;
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const category = document.getElementById('task-category').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;
    const progress = document.getElementById('task-progress').value; // Make sure this input exists

    const labels = Array.from(document.querySelectorAll('#label-container input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    const newTask = {
        title,
        description,
        category,
        deadline,
        priority,
        labels,
        progress,
        completed: false,
        timeSpent: 0,
    };

    const taskListItem = createTaskItem(newTask);
    taskList.appendChild(taskListItem);

    taskForm.reset(); // Clear the form
    // Optional: updateCharts();
});
