document.addEventListener('DOMContentLoaded', function() {
    // Form submissions
    document.getElementById('issueForm').addEventListener('submit', createIssue);
    document.getElementById('searchForm').addEventListener('submit', searchIssues);
    document.getElementById('updateForm').addEventListener('submit', updateIssue);
});

// Create a new issue
async function createIssue(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const projectName = formData.get('projectName');
    
    const issueData = {
        issue_title: formData.get('issueTitle'),
        issue_text: formData.get('issueText'),
        created_by: formData.get('createdBy'),
        assigned_to: formData.get('assignedTo') || '',
        status_text: formData.get('statusText') || ''
    };
    
    try {
        const response = await fetch(`/api/issues/${projectName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issueData)
        });
        
        const result = await response.json();
        
        if (result.error) {
            alert(`Error: ${result.error}`);
        } else {
            alert('Issue created successfully!');
            e.target.reset();
            // Refresh the issues list if we're viewing the same project
            if (document.getElementById('searchProject').value === projectName) {
                searchIssues({ preventDefault: () => {} });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating issue');
    }
}

// Search for issues
async function searchIssues(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const projectName = formData.get('searchProject');
    
    // Build query parameters
    const params = new URLSearchParams();
    if (formData.get('searchOpen')) {
        params.append('open', formData.get('searchOpen'));
    }
    if (formData.get('searchCreatedBy')) {
        params.append('created_by', formData.get('searchCreatedBy'));
    }
    if (formData.get('searchAssignedTo')) {
        params.append('assigned_to', formData.get('searchAssignedTo'));
    }
    
    const queryString = params.toString();
    const url = `/api/issues/${projectName}${queryString ? '?' + queryString : ''}`;
    
    try {
        const response = await fetch(url);
        const issues = await response.json();
        
        displayIssues(issues);
    } catch (error) {
        console.error('Error:', error);
        alert('Error searching issues');
    }
}

// Display issues in the UI
function displayIssues(issues) {
    const issuesList = document.getElementById('issuesList');
    
    if (issues.length === 0) {
        issuesList.innerHTML = '<p>No issues found.</p>';
        return;
    }
    
    issuesList.innerHTML = issues.map(issue => `
        <div class="issue-card">
            <div class="issue-header">
                <div class="issue-title">${issue.issue_title}</div>
                <div class="issue-status ${issue.open ? 'status-open' : 'status-closed'}">
                    ${issue.open ? 'Open' : 'Closed'}
                </div>
            </div>
            
            <div class="issue-meta">
                <span><strong>Created by:</strong> ${issue.created_by}</span>
                <span><strong>Assigned to:</strong> ${issue.assigned_to || 'Unassigned'}</span>
                <span><strong>Status:</strong> ${issue.status_text || 'No status'}</span>
                <span><strong>Created:</strong> ${new Date(issue.created_on).toLocaleDateString()}</span>
                <span><strong>Updated:</strong> ${new Date(issue.updated_on).toLocaleDateString()}</span>
            </div>
            
            <div class="issue-text">${issue.issue_text}</div>
            
            <div class="issue-actions">
                <button class="btn-edit" onclick="editIssue('${issue._id}', '${issue.issue_title}', '${issue.issue_text}', '${issue.assigned_to}', '${issue.status_text}', ${issue.open})">
                    Edit
                </button>
                <button class="btn-delete" onclick="deleteIssue('${issue._id}', '${document.getElementById('searchProject').value}')">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Edit an issue
function editIssue(id, title, text, assignedTo, statusText, open) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateIssueTitle').value = title;
    document.getElementById('updateIssueText').value = text;
    document.getElementById('updateAssignedTo').value = assignedTo;
    document.getElementById('updateStatusText').value = statusText;
    document.getElementById('updateOpen').value = open.toString();
    
    document.querySelector('.update-container').style.display = 'block';
    document.querySelector('.update-container').scrollIntoView({ behavior: 'smooth' });
}

// Cancel update
function cancelUpdate() {
    document.querySelector('.update-container').style.display = 'none';
    document.getElementById('updateForm').reset();
}

// Update an issue
async function updateIssue(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const projectName = document.getElementById('searchProject').value;
    const issueId = formData.get('updateId');
    
    const updateData = {
        _id: issueId
    };
    
    // Only include fields that have values
    if (formData.get('updateIssueTitle')) {
        updateData.issue_title = formData.get('updateIssueTitle');
    }
    if (formData.get('updateIssueText')) {
        updateData.issue_text = formData.get('updateIssueText');
    }
    if (formData.get('updateAssignedTo')) {
        updateData.assigned_to = formData.get('updateAssignedTo');
    }
    if (formData.get('updateStatusText')) {
        updateData.status_text = formData.get('updateStatusText');
    }
    if (formData.get('updateOpen')) {
        updateData.open = formData.get('updateOpen') === 'true';
    }
    
    try {
        const response = await fetch(`/api/issues/${projectName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        const result = await response.json();
        
        if (result.error) {
            alert(`Error: ${result.error}`);
        } else {
            alert('Issue updated successfully!');
            cancelUpdate();
            // Refresh the issues list
            searchIssues({ preventDefault: () => {} });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating issue');
    }
}

// Delete an issue
async function deleteIssue(issueId, projectName) {
    if (!confirm('Are you sure you want to delete this issue?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/issues/${projectName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: issueId })
        });
        
        const result = await response.json();
        
        if (result.error) {
            alert(`Error: ${result.error}`);
        } else {
            alert('Issue deleted successfully!');
            // Refresh the issues list
            searchIssues({ preventDefault: () => {} });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting issue');
    }
}
