// const API = '/api';
// let token = localStorage.getItem('token');
// let user = null;
// let allEmployees = [];
// let allDepartments = [];
// let currentDeleteId = null;
// let currentDeleteType = null;
// let allOpenings = JSON.parse(localStorage.getItem('openings') || '[]');

// document.addEventListener('DOMContentLoaded', async () => {
//   setupTheme();
//   setupEventListeners();
//   updateOpeningsBadge();

//   if (token) {
//     const restored = await fetchMe();
//     if (restored) {
//       showApp();
//     } else {
//       showLogin();
//     }
//   } else {
//     showLogin();
//   }
// });

// function authHeaders(includeJson = false) {
//   const headers = {};
//   if (includeJson) headers['Content-Type'] = 'application/json';
//   if (token) headers.Authorization = `Bearer ${token}`;
//   return headers;
// }

// async function parseJsonResponse(res) {
//   const data = await res.json();
//   if (!res.ok || data.success === false) {
//     throw new Error(data.message || 'Request failed');
//   }
//   return data;
// }

// async function apiRequest(url, options = {}) {
//   const res = await fetch(url, options);
//   return parseJsonResponse(res);
// }

// function setupTheme() {
//   const theme = localStorage.getItem('theme') || 'dark';
//   document.body.classList.remove('light-theme', 'dark-theme');
//   document.body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');

//   const icon = document.querySelector('#themeToggle i');
//   if (icon) {
//     icon.classList.toggle('fa-moon', theme !== 'light');
//     icon.classList.toggle('fa-sun', theme === 'light');
//   }
// }

// function toggleTheme() {
//   const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';

//   document.body.classList.remove('light-theme', 'dark-theme');
//   document.body.classList.add(nextTheme === 'light' ? 'light-theme' : 'dark-theme');
//   localStorage.setItem('theme', nextTheme);

//   const icon = document.querySelector('#themeToggle i');
//   if (icon) {
//     icon.classList.toggle('fa-moon', nextTheme !== 'light');
//     icon.classList.toggle('fa-sun', nextTheme === 'light');
//   }
// }

// async function fetchMe() {
//   try {
//     const data = await apiRequest(`${API}/auth/me`, {
//       headers: authHeaders(),
//     });
//     user = data.user;
//     return true;
//   } catch (err) {
//     token = null;
//     user = null;
//     localStorage.removeItem('token');
//     return false;
//   }
// }

// function setupEventListeners() {
//   // Auth
//   document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
//   document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
//   document.getElementById('goToRegister')?.addEventListener('click', showRegisterView);
//   document.getElementById('goToLogin')?.addEventListener('click', showLoginView);

//   // Password toggles
//   document.querySelectorAll('.toggle-password').forEach(toggle => {
//     toggle.addEventListener('click', () => togglePassword(toggle));
//   });

//   // Theme + logout
//   document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
//   document.getElementById('logout')?.addEventListener('click', handleLogout);

//   // Navigation
//   document.querySelectorAll('.nav-item').forEach(item => {
//     item.addEventListener('click', () => {
//       if (!item.classList.contains('logout')) {
//         navigatePage(item.dataset.page);
//       }
//     });
//   });

//   // Sidebar
//   document.getElementById('sidebarToggle')?.addEventListener('click', toggleSidebar);

//   // Add buttons
//   document.getElementById('addEmployeeBtn')?.addEventListener('click', () => showForm('employee'));
//   document.getElementById('addDepartmentBtn')?.addEventListener('click', () => showForm('department'));
//   document.getElementById('addOpeningBtn')?.addEventListener('click', () => showOpeningForm());

//   // Search
//   document.getElementById('employeeSearch')?.addEventListener('input', filterEmployees);
//   document.getElementById('departmentSearch')?.addEventListener('input', filterDepartments);
//   document.getElementById('openingSearch')?.addEventListener('input', filterOpenings);

//   // Forms / modals
//   document.getElementById('entityForm')?.addEventListener('submit', handleFormSubmit);
//   document.getElementById('confirmBtn')?.addEventListener('click', confirmDelete);
//   document.getElementById('applyForm')?.addEventListener('submit', handleApplySubmit);

//   document.querySelectorAll('#modal .modal-overlay').forEach(el =>
//     el.addEventListener('click', closeModal)
//   );
//   document.querySelectorAll('#confirmModal .modal-overlay').forEach(el =>
//     el.addEventListener('click', closeConfirm)
//   );
//   document.querySelectorAll('#applyModal .modal-overlay').forEach(el =>
//     el.addEventListener('click', closeApply)
//   );
// }

// function showLoginView() {
//   document.getElementById('loginView')?.classList.remove('hidden');
//   document.getElementById('registerView')?.classList.add('hidden');

//   const loginError = document.getElementById('loginError');
//   const registerError = document.getElementById('registerError');

//   if (loginError) {
//     loginError.textContent = '';
//     loginError.classList.remove('show');
//   }

//   if (registerError) {
//     registerError.textContent = '';
//     registerError.classList.remove('show');
//   }
// }

// function showRegisterView() {
//   document.getElementById('registerView')?.classList.remove('hidden');
//   document.getElementById('loginView')?.classList.add('hidden');

//   const loginError = document.getElementById('loginError');
//   const registerError = document.getElementById('registerError');

//   if (loginError) {
//     loginError.textContent = '';
//     loginError.classList.remove('show');
//   }

//   if (registerError) {
//     registerError.textContent = '';
//     registerError.classList.remove('show');
//   }
// }

// function showRegisterError(message) {
//   const errorDiv = document.getElementById('registerError');
//   if (!errorDiv) return;

//   errorDiv.textContent = message;
//   errorDiv.classList.add('show');

//   setTimeout(() => {
//     errorDiv.classList.remove('show');
//   }, 3000);
// }

// function showLoginError(message) {
//   const errorDiv = document.getElementById('loginError');
//   if (!errorDiv) return;

//   errorDiv.textContent = message;
//   errorDiv.classList.add('show');

//   setTimeout(() => {
//     errorDiv.classList.remove('show');
//   }, 3000);
// }

// function showLogin() {
//   document.getElementById('loginContainer')?.classList.remove('hidden');
//   document.getElementById('appContainer')?.classList.add('hidden');

//   document.getElementById('loginForm')?.reset();
//   document.getElementById('registerForm')?.reset();

//   showLoginView();
// }

// function showApp() {
//   document.getElementById('loginContainer')?.classList.add('hidden');
//   document.getElementById('appContainer')?.classList.remove('hidden');

//   document.getElementById('userName').textContent = user?.username || 'User';
//   document.getElementById('userRole').textContent = user?.role || 'user';

//   const adminOnly = document.querySelectorAll('.admin-only');
//   adminOnly.forEach(el => {
//     el.classList.toggle('visible', user?.role === 'admin');
//   });

//   updateOpeningsBadge();
//   navigatePage('dashboard');
// }

// function handleLogout() {
//   token = null;
//   user = null;
//   localStorage.removeItem('token');
//   showLogin();
//   showToast('Logged out successfully', 'info');
// }

// function togglePassword(toggleEl) {
//   if (!toggleEl) return;

//  const wrapper = toggleEl.closest('.auth-input');
//   if (!wrapper) return;

//   const input = wrapper.querySelector('input');
//   if (!input) return;

//   if (input.type === 'password') {
//     input.type = 'text';
//     toggleEl.classList.remove('fa-eye-slash');
//     toggleEl.classList.add('fa-eye');
//   } else {
//     input.type = 'password';
//     toggleEl.classList.add('fa-eye-slash');
//     toggleEl.classList.remove('fa-eye');
//   }
// }

// async function handleLogin(e) {
//   e.preventDefault();

//   const username = document.getElementById('username')?.value.trim();
//   const password = document.getElementById('password')?.value;

//   showLoading(true);

//   try {
//     const data = await apiRequest(`${API}/auth/login`, {
//       method: 'POST',
//       headers: authHeaders(true),
//       body: JSON.stringify({ username, password }),
//     });

//     token = data.token;
//     user = data.user;
//     localStorage.setItem('token', token);

//     showApp();
//     showToast('Login successful!', 'success');
//   } catch (err) {
//     showLoginError(err.message || 'Login failed. Please try again.');
//   } finally {
//     showLoading(false);
//   }
// }

// async function handleRegister(e) {
//   e.preventDefault();

//   const username = document.getElementById('registerUsername')?.value.trim();
//   const email = document.getElementById('registerEmail')?.value.trim();
//   const password = document.getElementById('registerPassword')?.value;

//   showLoading(true);

//   try {
//     const data = await apiRequest(`${API}/auth/register`, {
//       method: 'POST',
//       headers: authHeaders(true),
//       body: JSON.stringify({ username, email, password }),
//     });

//     showToast(data.message || 'Registration successful. Please sign in.', 'success');
//     document.getElementById('registerForm')?.reset();
//     showLoginView();
//   } catch (err) {
//     showRegisterError(err.message || 'Registration failed');
//   } finally {
//     showLoading(false);
//   }
// }

// function toggleSidebar() {
//   document.querySelector('.sidebar')?.classList.toggle('open');
// }

// function navigatePage(page) {
//   document.querySelectorAll('.nav-item').forEach(item => {
//     item.classList.toggle('active', item.dataset.page === page);
//   });

//   const titles = {
//     dashboard: 'Dashboard',
//     employees: 'Employees',
//     departments: 'Departments',
//     openings: 'Open Roles',
//   };

//   const pageTitle = document.getElementById('pageTitle');
//   if (pageTitle) pageTitle.textContent = titles[page] || 'Dashboard';

//   document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

//   const pageElement = document.getElementById(`${page}Page`);
//   if (pageElement) {
//     pageElement.classList.add('active');
//   }

//   if (page === 'employees') {
//     loadEmployees();
//   } else if (page === 'departments') {
//     loadDepartments();
//   } else if (page === 'dashboard') {
//     loadDashboard();
//   } else if (page === 'openings') {
//     loadOpenings();
//   }
// }

// async function loadDashboard() {
//   showLoading(true);
//   try {
//     const [empData, deptData] = await Promise.all([
//       apiRequest(`${API}/employees`, { headers: authHeaders() }),
//       apiRequest(`${API}/departments`, { headers: authHeaders() }),
//     ]);

//     allEmployees = empData.data;
//     allDepartments = deptData.data;

//     document.getElementById('totalEmployees').textContent = allEmployees.length;
//     document.getElementById('totalDepartments').textContent = allDepartments.length;
//     document.getElementById('adminStatus').textContent =
//       user?.role === 'admin' ? '✓ Admin' : '— Viewer';

//     const totalOpeningsEl = document.getElementById('totalOpenings');
//     if (totalOpeningsEl) totalOpeningsEl.textContent = allOpenings.length;

//     renderRecentEmployees(allEmployees.slice(0, 5));
//   } catch (err) {
//     showToast(err.message || 'Failed to load dashboard', 'error');
//   } finally {
//     showLoading(false);
//   }
// }

// function renderRecentEmployees(employees) {
//   const tbody = document.querySelector('#recentEmployeesTable tbody');
//   if (!tbody) return;

//   tbody.innerHTML = '';

//   if (employees.length === 0) {
//     tbody.innerHTML =
//       '<tr><td colspan="4" style="text-align:center;color:var(--secondary-color)">No employees yet</td></tr>';
//     return;
//   }

//   employees.forEach(emp => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${emp.employeeId}</td>
//       <td>${emp.name}</td>
//       <td>${emp.email}</td>
//       <td>${emp.Department?.name || 'N/A'}</td>
//     `;
//     tbody.appendChild(row);
//   });
// }

// async function loadEmployees() {
//   showLoading(true);
//   try {
//     const data = await apiRequest(`${API}/employees`, {
//       headers: authHeaders(),
//     });

//     allEmployees = data.data;
//     renderEmployees(allEmployees);
//   } catch (err) {
//     showToast(err.message || 'Failed to load employees', 'error');
//   } finally {
//     showLoading(false);
//   }
// }

// function renderEmployees(employees) {
//   const tbody = document.querySelector('#employeesTable tbody');
//   const emptyState = document.getElementById('emptyEmployees');
//   if (!tbody || !emptyState) return;

//   tbody.innerHTML = '';

//   if (employees.length === 0) {
//     emptyState.style.display = 'flex';
//     return;
//   }

//   emptyState.style.display = 'none';

//   employees.forEach(emp => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${emp.employeeId}</td>
//       <td>${emp.name}</td>
//       <td>${emp.email}</td>
//       <td>${emp.Department?.name || 'N/A'}</td>
//       <td>$${parseFloat(emp.salary).toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       })}</td>
//       <td>${new Date(emp.joinDate).toLocaleDateString()}</td>
//       <td>
//         <div class="action-buttons">
//           ${user?.role === 'admin'
//             ? `
//             <button class="action-btn edit" onclick="editEmployee(${emp.id})" title="Edit">
//               <i class="fas fa-edit"></i>
//             </button>
//             <button class="action-btn delete" onclick="deleteEmployee(${emp.id})" title="Delete">
//               <i class="fas fa-trash"></i>
//             </button>
//           `
//             : '—'}
//         </div>
//       </td>
//     `;
//     tbody.appendChild(row);
//   });
// }

// function filterEmployees() {
//   const query = document.getElementById('employeeSearch')?.value.toLowerCase() || '';
//   const filtered = allEmployees.filter(emp =>
//     emp.name.toLowerCase().includes(query) ||
//     emp.email.toLowerCase().includes(query) ||
//     String(emp.employeeId).includes(query)
//   );
//   renderEmployees(filtered);
// }

// async function loadDepartments() {
//   showLoading(true);
//   try {
//     const data = await apiRequest(`${API}/departments`, {
//       headers: authHeaders(),
//     });

//     allDepartments = data.data;
//     renderDepartments(allDepartments);
//   } catch (err) {
//     showToast(err.message || 'Failed to load departments', 'error');
//   } finally {
//     showLoading(false);
//   }
// }

// function renderDepartments(departments) {
//   const tbody = document.querySelector('#departmentsTable tbody');
//   const emptyState = document.getElementById('emptyDepartments');
//   if (!tbody || !emptyState) return;

//   tbody.innerHTML = '';

//   if (departments.length === 0) {
//     emptyState.style.display = 'flex';
//     return;
//   }

//   emptyState.style.display = 'none';

//   departments.forEach(dept => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${dept.id}</td>
//       <td>${dept.name}</td>
//       <td>${dept.description || '—'}</td>
//       <td>
//         <div class="action-buttons">
//           ${user?.role === 'admin'
//             ? `
//             <button class="action-btn edit" onclick="editDepartment(${dept.id})" title="Edit">
//               <i class="fas fa-edit"></i>
//             </button>
//             <button class="action-btn delete" onclick="deleteDepartment(${dept.id})" title="Delete">
//               <i class="fas fa-trash"></i>
//             </button>
//           `
//             : '—'}
//         </div>
//       </td>
//     `;
//     tbody.appendChild(row);
//   });
// }

// function filterDepartments() {
//   const query = document.getElementById('departmentSearch')?.value.toLowerCase() || '';
//   const filtered = allDepartments.filter(dept =>
//     dept.name.toLowerCase().includes(query) ||
//     (dept.description && dept.description.toLowerCase().includes(query))
//   );
//   renderDepartments(filtered);
// }

// function showForm(type, id = null) {
//   const form = document.getElementById('entityForm');
//   const title = document.getElementById('modalTitle');
//   if (!form || !title) return;

//   form.innerHTML = '';
//   form.dataset.type = type;
//   form.dataset.id = id || '';

//   if (type === 'employee') {
//     title.textContent = id ? 'Edit Employee' : 'Add Employee';
//     form.innerHTML = `
//       <div class="form-group">
//         <label for="emp-name">Name *</label>
//         <input type="text" id="emp-name" name="name" placeholder="Full name" required>
//       </div>
//       <div class="form-group">
//         <label for="emp-email">Email *</label>
//         <input type="email" id="emp-email" name="email" placeholder="Email address" required>
//       </div>
//       <div class="form-group">
//         <label for="emp-dept">Department *</label>
//         <select id="emp-dept" name="departmentId" required>
//           <option value="">Select a department</option>
//         </select>
//       </div>
//       <div class="form-group">
//         <label for="emp-salary">Salary *</label>
//         <input type="number" id="emp-salary" name="salary" placeholder="0.00" step="0.01" required>
//       </div>
//       <div class="form-group">
//         <label for="emp-date">Join Date *</label>
//         <input type="date" id="emp-date" name="joinDate" required>
//       </div>
//       <div class="form-actions">
//         <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
//         <button type="submit" class="btn btn-primary">
//           <i class="fas fa-save"></i>
//           ${id ? 'Update Employee' : 'Add Employee'}
//         </button>
//       </div>
//     `;
//     loadDepartmentOptions();
//   } else if (type === 'department') {
//     title.textContent = id ? 'Edit Department' : 'Add Department';
//     form.innerHTML = `
//       <div class="form-group">
//         <label for="dept-name">Name *</label>
//         <input type="text" id="dept-name" name="name" placeholder="Department name" required>
//       </div>
//       <div class="form-group">
//         <label for="dept-desc">Description</label>
//         <textarea id="dept-desc" name="description" placeholder="Department description..."></textarea>
//       </div>
//       <div class="form-actions">
//         <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
//         <button type="submit" class="btn btn-primary">
//           <i class="fas fa-save"></i>
//           ${id ? 'Update Department' : 'Add Department'}
//         </button>
//       </div>
//     `;
//   }

//   document.getElementById('modal')?.classList.remove('hidden');
// }

// async function loadDepartmentOptions(selectedValue = '') {
//   try {
//     const data = await apiRequest(`${API}/departments`, {
//       headers: authHeaders(),
//     });

//     const select = document.getElementById('emp-dept');
//     if (!select) return;

//     select.innerHTML = '<option value="">Select a department</option>';
//     data.data.forEach(dept => {
//       const option = document.createElement('option');
//       option.value = dept.id;
//       option.textContent = dept.name;
//       select.appendChild(option);
//     });

//     if (selectedValue) {
//       select.value = selectedValue;
//     }
//   } catch (err) {
//     showToast(err.message || 'Failed to load departments', 'error');
//   }
// }

// async function editEmployee(id) {
//   try {
//     const data = await apiRequest(`${API}/employees/${id}`, {
//       headers: authHeaders(),
//     });

//     const emp = data.data;
//     showForm('employee', id);

//     document.getElementById('emp-name').value = emp.name;
//     document.getElementById('emp-email').value = emp.email;
//     document.getElementById('emp-salary').value = emp.salary;
//     document.getElementById('emp-date').value = emp.joinDate.split('T')[0];

//     await loadDepartmentOptions(emp.departmentId);
//   } catch (err) {
//     showToast(err.message || 'Failed to load employee', 'error');
//   }
// }

// function deleteEmployee(id) {
//   currentDeleteId = id;
//   currentDeleteType = 'employee';
//   showConfirmModal(
//     'Delete Employee',
//     'Are you sure you want to delete this employee? This action cannot be undone.'
//   );
// }

// async function editDepartment(id) {
//   try {
//     const data = await apiRequest(`${API}/departments/${id}`, {
//       headers: authHeaders(),
//     });

//     const dept = data.data;
//     showForm('department', id);

//     document.getElementById('dept-name').value = dept.name;
//     document.getElementById('dept-desc').value = dept.description || '';
//   } catch (err) {
//     showToast(err.message || 'Failed to load department', 'error');
//   }
// }

// function deleteDepartment(id) {
//   currentDeleteId = id;
//   currentDeleteType = 'department';
//   showConfirmModal(
//     'Delete Department',
//     'Are you sure you want to delete this department? This action cannot be undone.'
//   );
// }

// async function refreshByType(type) {
//   if (type === 'employee') return loadEmployees();
//   if (type === 'department') return loadDepartments();
//   if (type === 'opening') return loadOpenings();
// }

// async function confirmDelete() {
//   if (!currentDeleteId || !currentDeleteType) return;

//   if (currentDeleteType === 'opening') {
//     allOpenings = allOpenings.filter(o => o.id !== currentDeleteId);
//     saveOpenings();
//     closeConfirm();
//     showToast('Opening deleted', 'success');
//     loadOpenings();
//     currentDeleteId = null;
//     currentDeleteType = null;
//     return;
//   }

//   showLoading(true);
//   closeConfirm();

//   try {
//     const resourceMap = {
//       employee: 'employees',
//       department: 'departments',
//     };

//     await apiRequest(`${API}/${resourceMap[currentDeleteType]}/${currentDeleteId}`, {
//       method: 'DELETE',
//       headers: authHeaders(),
//     });

//     showToast(`${currentDeleteType} deleted successfully`, 'success');
//     await refreshByType(currentDeleteType);
//   } catch (err) {
//     showToast(err.message || 'Delete failed', 'error');
//   } finally {
//     showLoading(false);
//     currentDeleteId = null;
//     currentDeleteType = null;
//   }
// }

// async function handleFormSubmit(e) {
//   e.preventDefault();

//   const form = e.target;
//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData);
//   const type = form.dataset.type;
//   const id = form.dataset.id;

//   if (type === 'opening') {
//     if (id) {
//       const idx = allOpenings.findIndex(o => o.id === parseInt(id, 10));
//       if (idx !== -1) {
//         allOpenings[idx] = { ...allOpenings[idx], ...data };
//       }
//     } else {
//       allOpenings.push({ id: Date.now(), ...data });
//     }

//     saveOpenings();
//     closeModal();
//     showToast(`Opening ${id ? 'updated' : 'created'} successfully`, 'success');
//     loadOpenings();
//     return;
//   }

//   const method = id ? 'PUT' : 'POST';
//   const url = `${API}/${type}s${id ? `/${id}` : ''}`;

//   showLoading(true);

//   try {
//     await apiRequest(url, {
//       method,
//       headers: authHeaders(true),
//       body: JSON.stringify(data),
//     });

//     closeModal();
//     showToast(`${type} ${id ? 'updated' : 'created'} successfully`, 'success');
//     await refreshByType(type);
//   } catch (err) {
//     showToast(err.message || 'Operation failed', 'error');
//   } finally {
//     showLoading(false);
//   }
// }

// function closeModal() {
//   document.getElementById('modal')?.classList.add('hidden');
//   document.getElementById('entityForm')?.reset();
// }

// function showConfirmModal(title, message) {
//   document.getElementById('confirmTitle').textContent = title;
//   document.getElementById('confirmMessage').textContent = message;
//   document.getElementById('confirmModal')?.classList.remove('hidden');
// }

// function closeConfirm() {
//   document.getElementById('confirmModal')?.classList.add('hidden');
// }

// function showLoading(show) {
//   const overlay = document.getElementById('loadingOverlay');
//   if (!overlay) return;

//   if (show) {
//     overlay.classList.remove('hidden');
//   } else {
//     overlay.classList.add('hidden');
//   }
// }

// function showToast(message, type = 'info') {
//   const container = document.getElementById('toastContainer');
//   if (!container) return;

//   const toast = document.createElement('div');
//   toast.className = `toast ${type}`;

//   const icons = {
//     success: 'fa-check-circle',
//     error: 'fa-exclamation-circle',
//     info: 'fa-info-circle',
//   };

//   toast.innerHTML = `
//     <i class="fas ${icons[type] || icons.info}"></i>
//     <span>${message}</span>
//   `;

//   container.appendChild(toast);

//   setTimeout(() => {
//     toast.style.animation = 'slideInRight 0.3s ease reverse';
//     setTimeout(() => toast.remove(), 300);
//   }, 3000);
// }

// // ── Open Roles ────────────────────────────────────────────────────────────────

// function saveOpenings() {
//   localStorage.setItem('openings', JSON.stringify(allOpenings));
//   updateOpeningsBadge();
// }

// function updateOpeningsBadge() {
//   const badge = document.getElementById('openingsBadge');
//   if (badge) badge.textContent = allOpenings.length;
// }

// function loadOpenings() {
//   renderOpenings(allOpenings);
//   updateOpeningsBadge();
// }

// function renderOpenings(list) {
//   const grid = document.getElementById('openingsGrid');
//   const empty = document.getElementById('emptyOpenings');
//   if (!grid) return;

//   grid.innerHTML = '';

//   if (list.length === 0) {
//     if (empty) empty.style.display = 'block';
//     return;
//   }

//   if (empty) empty.style.display = 'none';

//   list.forEach(o => {
//     const card = document.createElement('div');
//     card.className = 'job-card';
//     card.innerHTML = `
//       <div class="job-card-header">
//         <span class="job-badge ${
//           o.type === 'Full-time'
//             ? 'badge-green'
//             : o.type === 'Part-time'
//             ? 'badge-yellow'
//             : 'badge-blue'
//         }">${o.type}</span>
//         ${user?.role === 'admin'
//           ? `
//           <div class="action-buttons" style="margin-left:auto">
//             <button class="action-btn edit" onclick="editOpening(${o.id})" title="Edit"><i class="fas fa-edit"></i></button>
//             <button class="action-btn delete" onclick="deleteOpening(${o.id})" title="Delete"><i class="fas fa-trash"></i></button>
//           </div>`
//           : ''}
//       </div>
//       <h3 class="job-title">${o.title}</h3>
//       <p class="job-dept"><i class="fas fa-building"></i> ${o.department}</p>
//       <p class="job-desc">${o.description || ''}</p>
//       <div class="job-footer">
//         <span class="job-salary"><i class="fas fa-dollar-sign"></i> ${o.salary || 'Negotiable'}</span>
//         <button class="btn btn-primary" style="padding:0.5rem 1rem;font-size:0.875rem" onclick="openApplyModal(${o.id})">Apply Now</button>
//       </div>
//     `;
//     grid.appendChild(card);
//   });
// }

// function filterOpenings() {
//   const q = document.getElementById('openingSearch')?.value.toLowerCase() || '';
//   renderOpenings(
//     allOpenings.filter(o =>
//       o.title.toLowerCase().includes(q) || o.department.toLowerCase().includes(q)
//     )
//   );
// }

// function showOpeningForm(id = null) {
//   const o = id ? allOpenings.find(x => x.id === id) : null;
//   const title = document.getElementById('modalTitle');
//   const form = document.getElementById('entityForm');
//   if (!title || !form) return;

//   title.textContent = id ? 'Edit Opening' : 'Add Opening';
//   form.dataset.type = 'opening';
//   form.dataset.id = id || '';
//   form.innerHTML = `
//     <div class="form-group">
//       <label>Job Title *</label>
//       <input type="text" name="title" class="form-control" value="${o?.title || ''}" required>
//     </div>
//     <div class="form-group">
//       <label>Department *</label>
//       <input type="text" name="department" class="form-control" value="${o?.department || ''}" required>
//     </div>
//     <div class="form-group">
//       <label>Type</label>
//       <select name="type" class="form-select">
//         ${['Full-time', 'Part-time', 'Contract']
//           .map(t => `<option ${o?.type === t ? 'selected' : ''}>${t}</option>`)
//           .join('')}
//       </select>
//     </div>
//     <div class="form-group">
//       <label>Salary Range</label>
//       <input type="text" name="salary" class="form-control" value="${o?.salary || ''}" placeholder="e.g. $60k–$80k">
//     </div>
//     <div class="form-group">
//       <label>Description</label>
//       <textarea name="description" class="form-control" rows="3" style="resize:vertical">${o?.description || ''}</textarea>
//     </div>
//     <div class="form-actions">
//       <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
//       <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> ${id ? 'Update' : 'Save'}</button>
//     </div>
//   `;

//   document.getElementById('modal')?.classList.remove('hidden');
// }

// function editOpening(id) {
//   showOpeningForm(id);
// }

// function deleteOpening(id) {
//   currentDeleteId = id;
//   currentDeleteType = 'opening';
//   showConfirmModal('Delete Opening', 'Are you sure you want to delete this job opening?');
// }

// function openApplyModal(id) {
//   const opening = allOpenings.find(x => x.id === id);
//   if (!opening) return;

//   document.getElementById('applyJobTitle').textContent = opening.title;
//   document.getElementById('applyForm').dataset.id = id;
//   document.getElementById('applyForm').reset();
//   document.getElementById('applyModal')?.classList.remove('hidden');
// }

// function closeApply() {
//   document.getElementById('applyModal')?.classList.add('hidden');
// }

// function handleApplySubmit(e) {
//   e.preventDefault();
//   closeApply();
//   showToast('Application submitted successfully!', 'success');
// }
const API = '/api';
let token = localStorage.getItem('token');
let user = null;
let allEmployees = [];
let allDepartments = [];
let currentDeleteId = null;
let currentDeleteType = null;
let allOpenings = JSON.parse(localStorage.getItem('openings') || '[]');

document.addEventListener('DOMContentLoaded', async () => {
  setupTheme();
  setupEventListeners();
  updateOpeningsBadge();

  if (token) {
    const restored = await fetchMe();
    if (restored) {
      showApp();
    } else {
      showLogin();
    }
  } else {
    showLogin();
  }
});

function authHeaders(includeJson = false) {
  const headers = {};
  if (includeJson) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function parseJsonResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

async function apiRequest(url, options = {}) {
  const res = await fetch(url, options);
  return parseJsonResponse(res);
}

function setupTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');

  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.classList.toggle('fa-moon', theme !== 'light');
    icon.classList.toggle('fa-sun', theme === 'light');
  }
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';

  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(nextTheme === 'light' ? 'light-theme' : 'dark-theme');
  localStorage.setItem('theme', nextTheme);

  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.classList.toggle('fa-moon', nextTheme !== 'light');
    icon.classList.toggle('fa-sun', nextTheme === 'light');
  }
}

async function fetchMe() {
  try {
    const data = await apiRequest(`${API}/auth/me`, {
      headers: authHeaders(),
    });
    user = data.user;
    return true;
  } catch (err) {
    token = null;
    user = null;
    localStorage.removeItem('token');
    return false;
  }
}

function setupEventListeners() {
  // Auth
  document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
  document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
  document.getElementById('goToRegister')?.addEventListener('click', showRegisterView);
  document.getElementById('goToLogin')?.addEventListener('click', showLoginView);

  // Password toggles
  document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', () => togglePassword(toggle));
  });

  // Theme + logout
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('logout')?.addEventListener('click', handleLogout);

  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('logout')) {
        navigatePage(item.dataset.page);
      }
    });
  });

  // Sidebar
  document.getElementById('sidebarToggle')?.addEventListener('click', toggleSidebar);

  // Add buttons
  document.getElementById('addEmployeeBtn')?.addEventListener('click', () => showForm('employee'));
  document.getElementById('addDepartmentBtn')?.addEventListener('click', () => showForm('department'));
  document.getElementById('addOpeningBtn')?.addEventListener('click', () => showOpeningForm());

  // Search / filters
  document.getElementById('employeeSearch')?.addEventListener('input', filterEmployees);
  document.getElementById('employeeDepartmentFilter')?.addEventListener('change', filterEmployees);
  document.getElementById('departmentSearch')?.addEventListener('input', filterDepartments);
  document.getElementById('openingSearch')?.addEventListener('input', filterOpenings);

  // Forms / modals
  document.getElementById('entityForm')?.addEventListener('submit', handleFormSubmit);
  document.getElementById('confirmBtn')?.addEventListener('click', confirmDelete);
  document.getElementById('applyForm')?.addEventListener('submit', handleApplySubmit);

  document.querySelectorAll('#modal .modal-overlay').forEach(el =>
    el.addEventListener('click', closeModal)
  );
  document.querySelectorAll('#confirmModal .modal-overlay').forEach(el =>
    el.addEventListener('click', closeConfirm)
  );
  document.querySelectorAll('#applyModal .modal-overlay').forEach(el =>
    el.addEventListener('click', closeApply)
  );
}

function showLoginView() {
  document.getElementById('loginView')?.classList.remove('hidden');
  document.getElementById('registerView')?.classList.add('hidden');

  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');

  if (loginError) {
    loginError.textContent = '';
    loginError.classList.remove('show');
  }

  if (registerError) {
    registerError.textContent = '';
    registerError.classList.remove('show');
  }
}

function showRegisterView() {
  document.getElementById('registerView')?.classList.remove('hidden');
  document.getElementById('loginView')?.classList.add('hidden');

  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');

  if (loginError) {
    loginError.textContent = '';
    loginError.classList.remove('show');
  }

  if (registerError) {
    registerError.textContent = '';
    registerError.classList.remove('show');
  }
}

function showRegisterError(message) {
  const errorDiv = document.getElementById('registerError');
  if (!errorDiv) return;

  errorDiv.textContent = message;
  errorDiv.classList.add('show');

  setTimeout(() => {
    errorDiv.classList.remove('show');
  }, 3000);
}

function showLoginError(message) {
  const errorDiv = document.getElementById('loginError');
  if (!errorDiv) return;

  errorDiv.textContent = message;
  errorDiv.classList.add('show');

  setTimeout(() => {
    errorDiv.classList.remove('show');
  }, 3000);
}

function showLogin() {
  document.getElementById('loginContainer')?.classList.remove('hidden');
  document.getElementById('appContainer')?.classList.add('hidden');

  document.getElementById('loginForm')?.reset();
  document.getElementById('registerForm')?.reset();

  showLoginView();
}

function showApp() {
  document.getElementById('loginContainer')?.classList.add('hidden');
  document.getElementById('appContainer')?.classList.remove('hidden');

  document.getElementById('userName').textContent = user?.username || 'User';
  document.getElementById('userRole').textContent = user?.role || 'user';

  const adminOnly = document.querySelectorAll('.admin-only');
  adminOnly.forEach(el => {
    el.classList.toggle('visible', user?.role === 'admin');
  });

  updateOpeningsBadge();
  navigatePage('dashboard');
}

function handleLogout() {
  token = null;
  user = null;
  localStorage.removeItem('token');
  showLogin();
  showToast('Logged out successfully', 'info');
}

function togglePassword(toggleEl) {
  if (!toggleEl) return;

 const wrapper = toggleEl.closest('.auth-input');
  if (!wrapper) return;

  const input = wrapper.querySelector('input');
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    toggleEl.classList.remove('fa-eye-slash');
    toggleEl.classList.add('fa-eye');
  } else {
    input.type = 'password';
    toggleEl.classList.add('fa-eye-slash');
    toggleEl.classList.remove('fa-eye');
  }
}

async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value;

  showLoading(true);

  try {
    const data = await apiRequest(`${API}/auth/login`, {
      method: 'POST',
      headers: authHeaders(true),
      body: JSON.stringify({ username, password }),
    });

    token = data.token;
    user = data.user;
    localStorage.setItem('token', token);

    showApp();
    showToast('Login successful!', 'success');
  } catch (err) {
    showLoginError(err.message || 'Login failed. Please try again.');
  } finally {
    showLoading(false);
  }
}

async function handleRegister(e) {
  e.preventDefault();

  const username = document.getElementById('registerUsername')?.value.trim();
  const email = document.getElementById('registerEmail')?.value.trim();
  const password = document.getElementById('registerPassword')?.value;

  if (!username || username.length < 3) {
    showRegisterError('Username must be at least 3 characters long');
    return;
  }

  if (!email) {
    showRegisterError('Email is required');
    return;
  }

  if (!password || password.length < 6) {
    showRegisterError('Password must be at least 6 characters long');
    return;
  }

  showLoading(true);

  try {
    const data = await apiRequest(`${API}/auth/register`, {
      method: 'POST',
      headers: authHeaders(true),
      body: JSON.stringify({ username, email, password }),
    });

    showToast(data.message || 'Registration successful. Please sign in.', 'success');
    document.getElementById('registerForm')?.reset();
    showLoginView();
  } catch (err) {
    showRegisterError(err.message || 'Registration failed');
  } finally {
    showLoading(false);
  }
}

function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}

function navigatePage(page) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  const titles = {
    dashboard: 'Dashboard',
    employees: 'Employees',
    departments: 'Departments',
    openings: 'Open Roles',
  };

  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = titles[page] || 'Dashboard';

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const pageElement = document.getElementById(`${page}Page`);
  if (pageElement) {
    pageElement.classList.add('active');
  }

  if (page === 'employees') {
    loadEmployees();
  } else if (page === 'departments') {
    loadDepartments();
  } else if (page === 'dashboard') {
    loadDashboard();
  } else if (page === 'openings') {
    loadOpenings();
  }
}

async function loadDashboard() {
  showLoading(true);
  try {
    const [empData, deptData] = await Promise.all([
      apiRequest(`${API}/employees`, { headers: authHeaders() }),
      apiRequest(`${API}/departments`, { headers: authHeaders() }),
    ]);

    allEmployees = empData.data;
    allDepartments = deptData.data;

    document.getElementById('totalEmployees').textContent = allEmployees.length;
    document.getElementById('totalDepartments').textContent = allDepartments.length;
    document.getElementById('adminStatus').textContent =
      user?.role === 'admin' ? '✓ Admin' : '— Viewer';

    const totalOpeningsEl = document.getElementById('totalOpenings');
    if (totalOpeningsEl) totalOpeningsEl.textContent = allOpenings.length;

    renderRecentEmployees(allEmployees.slice(0, 5));
  } catch (err) {
    showToast(err.message || 'Failed to load dashboard', 'error');
  } finally {
    showLoading(false);
  }
}

function renderRecentEmployees(employees) {
  const tbody = document.querySelector('#recentEmployeesTable tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (employees.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align:center;color:var(--secondary-color)">No employees yet</td></tr>';
    return;
  }

  employees.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.employeeId}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.Department?.name || 'N/A'}</td>
    `;
    tbody.appendChild(row);
  });
}

async function loadEmployees() {
  showLoading(true);
  try {
    const [employeeData, departmentData] = await Promise.all([
      apiRequest(`${API}/employees`, { headers: authHeaders() }),
      apiRequest(`${API}/departments`, { headers: authHeaders() }),
    ]);

    allEmployees = employeeData.data;
    allDepartments = departmentData.data;

    populateEmployeeDepartmentFilter();
    renderEmployees(getFilteredEmployees());
  } catch (err) {
    showToast(err.message || 'Failed to load employees', 'error');
  } finally {
    showLoading(false);
  }
}

function renderEmployees(employees) {
  const tbody = document.querySelector('#employeesTable tbody');
  const emptyState = document.getElementById('emptyEmployees');
  if (!tbody || !emptyState) return;

  tbody.innerHTML = '';

  if (employees.length === 0) {
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  employees.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.employeeId}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.Department?.name || 'N/A'}</td>
      <td>$${parseFloat(emp.salary).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</td>
      <td>${new Date(emp.joinDate).toLocaleDateString()}</td>
      <td>
        <div class="action-buttons">
          ${user?.role === 'admin'
            ? `
            <button class="action-btn edit" onclick="editEmployee(${emp.id})" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" onclick="deleteEmployee(${emp.id})" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          `
            : '—'}
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function populateEmployeeDepartmentFilter() {
  const select = document.getElementById('employeeDepartmentFilter');
  if (!select) return;

  const currentValue = select.value;
  select.innerHTML = '<option value="">All Departments</option>';

  allDepartments.forEach(dept => {
    const option = document.createElement('option');
    option.value = String(dept.id);
    option.textContent = dept.name;
    select.appendChild(option);
  });

  if ([...select.options].some(option => option.value === currentValue)) {
    select.value = currentValue;
  }
}

function getFilteredEmployees() {
  const query = document.getElementById('employeeSearch')?.value.toLowerCase().trim() || '';
  const departmentId = document.getElementById('employeeDepartmentFilter')?.value || '';

  return allEmployees.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      String(emp.employeeId).toLowerCase().includes(query);

    const matchesDepartment =
      !departmentId || String(emp.departmentId) === String(departmentId);

    return matchesSearch && matchesDepartment;
  });
}

function filterEmployees() {
  renderEmployees(getFilteredEmployees());
}

async function loadDepartments() {
  showLoading(true);
  try {
    const data = await apiRequest(`${API}/departments`, {
      headers: authHeaders(),
    });

    allDepartments = data.data;
    renderDepartments(allDepartments);
  } catch (err) {
    showToast(err.message || 'Failed to load departments', 'error');
  } finally {
    showLoading(false);
  }
}

function renderDepartments(departments) {
  const tbody = document.querySelector('#departmentsTable tbody');
  const emptyState = document.getElementById('emptyDepartments');
  if (!tbody || !emptyState) return;

  tbody.innerHTML = '';

  if (departments.length === 0) {
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  departments.forEach(dept => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${dept.id}</td>
      <td>${dept.name}</td>
      <td>${dept.description || '—'}</td>
      <td>
        <div class="action-buttons">
          ${user?.role === 'admin'
            ? `
            <button class="action-btn edit" onclick="editDepartment(${dept.id})" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" onclick="deleteDepartment(${dept.id})" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          `
            : '—'}
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function filterDepartments() {
  const query = document.getElementById('departmentSearch')?.value.toLowerCase() || '';
  const filtered = allDepartments.filter(dept =>
    dept.name.toLowerCase().includes(query) ||
    (dept.description && dept.description.toLowerCase().includes(query))
  );
  renderDepartments(filtered);
}

function showForm(type, id = null) {
  const form = document.getElementById('entityForm');
  const title = document.getElementById('modalTitle');
  if (!form || !title) return;

  form.innerHTML = '';
  form.dataset.type = type;
  form.dataset.id = id || '';

  if (type === 'employee') {
    title.textContent = id ? 'Edit Employee' : 'Add Employee';
    form.innerHTML = `
      <div class="form-group">
        <label for="emp-name">Name *</label>
        <input type="text" id="emp-name" name="name" placeholder="Full name" required>
      </div>
      <div class="form-group">
        <label for="emp-email">Email *</label>
        <input type="email" id="emp-email" name="email" placeholder="Email address" required>
      </div>
      <div class="form-group">
        <label for="emp-dept">Department *</label>
        <select id="emp-dept" name="departmentId" required>
          <option value="">Select a department</option>
        </select>
      </div>
      <div class="form-group">
        <label for="emp-salary">Salary *</label>
        <input type="number" id="emp-salary" name="salary" placeholder="0.00" step="0.01" min="0.01" required>
      </div>
      <div class="form-group">
        <label for="emp-date">Join Date *</label>
        <input type="date" id="emp-date" name="joinDate" required>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save"></i>
          ${id ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    `;
    loadDepartmentOptions();
  } else if (type === 'department') {
    title.textContent = id ? 'Edit Department' : 'Add Department';
    form.innerHTML = `
      <div class="form-group">
        <label for="dept-name">Name *</label>
        <input type="text" id="dept-name" name="name" placeholder="Department name" required>
      </div>
      <div class="form-group">
        <label for="dept-desc">Description</label>
        <textarea id="dept-desc" name="description" placeholder="Department description..."></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save"></i>
          ${id ? 'Update Department' : 'Add Department'}
        </button>
      </div>
    `;
  }

  document.getElementById('modal')?.classList.remove('hidden');
}

async function loadDepartmentOptions(selectedValue = '') {
  try {
    const data = await apiRequest(`${API}/departments`, {
      headers: authHeaders(),
    });

    const select = document.getElementById('emp-dept');
    if (!select) return;

    select.innerHTML = '<option value="">Select a department</option>';
    data.data.forEach(dept => {
      const option = document.createElement('option');
      option.value = dept.id;
      option.textContent = dept.name;
      select.appendChild(option);
    });

    if (selectedValue) {
      select.value = selectedValue;
    }
  } catch (err) {
    showToast(err.message || 'Failed to load departments', 'error');
  }
}

async function editEmployee(id) {
  try {
    const data = await apiRequest(`${API}/employees/${id}`, {
      headers: authHeaders(),
    });

    const emp = data.data;
    showForm('employee', id);

    document.getElementById('emp-name').value = emp.name;
    document.getElementById('emp-email').value = emp.email;
    document.getElementById('emp-salary').value = emp.salary;
    document.getElementById('emp-date').value = emp.joinDate.split('T')[0];

    await loadDepartmentOptions(emp.departmentId);
  } catch (err) {
    showToast(err.message || 'Failed to load employee', 'error');
  }
}

function deleteEmployee(id) {
  currentDeleteId = id;
  currentDeleteType = 'employee';
  showConfirmModal(
    'Delete Employee',
    'Are you sure you want to delete this employee? This action cannot be undone.'
  );
}

async function editDepartment(id) {
  try {
    const data = await apiRequest(`${API}/departments/${id}`, {
      headers: authHeaders(),
    });

    const dept = data.data;
    showForm('department', id);

    document.getElementById('dept-name').value = dept.name;
    document.getElementById('dept-desc').value = dept.description || '';
  } catch (err) {
    showToast(err.message || 'Failed to load department', 'error');
  }
}

function deleteDepartment(id) {
  currentDeleteId = id;
  currentDeleteType = 'department';
  showConfirmModal(
    'Delete Department',
    'Are you sure you want to delete this department? This action cannot be undone.'
  );
}

async function refreshByType(type) {
  if (type === 'employee') return loadEmployees();
  if (type === 'department') return loadDepartments();
  if (type === 'opening') return loadOpenings();
}

async function confirmDelete() {
  if (!currentDeleteId || !currentDeleteType) return;

  if (currentDeleteType === 'opening') {
    allOpenings = allOpenings.filter(o => o.id !== currentDeleteId);
    saveOpenings();
    closeConfirm();
    showToast('Opening deleted', 'success');
    loadOpenings();
    currentDeleteId = null;
    currentDeleteType = null;
    return;
  }

  showLoading(true);
  closeConfirm();

  try {
    const resourceMap = {
      employee: 'employees',
      department: 'departments',
    };

    await apiRequest(`${API}/${resourceMap[currentDeleteType]}/${currentDeleteId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });

    showToast(`${currentDeleteType} deleted successfully`, 'success');
    await refreshByType(currentDeleteType);
  } catch (err) {
    showToast(err.message || 'Delete failed', 'error');
  } finally {
    showLoading(false);
    currentDeleteId = null;
    currentDeleteType = null;
  }
}


function validateEmployeeFormData(data) {
  const name = data.name?.trim();
  const email = data.email?.trim();
  const departmentId = data.departmentId;
  const salary = Number(data.salary);
  const joinDate = data.joinDate;

  if (!name || name.length < 2) {
    showToast('Employee name must be at least 2 characters long', 'error');
    return false;
  }

  if (!email) {
    showToast('Employee email is required', 'error');
    return false;
  }

  if (!departmentId) {
    showToast('Please select a department', 'error');
    return false;
  }

  if (Number.isNaN(salary) || salary <= 0) {
    showToast('Salary must be greater than 0', 'error');
    return false;
  }

  if (!joinDate || Number.isNaN(new Date(joinDate).getTime())) {
    showToast('Please select a valid join date', 'error');
    return false;
  }

  data.name = name;
  data.email = email;
  data.departmentId = Number(departmentId);
  data.salary = salary;

  return true;
}

function validateDepartmentFormData(data) {
  const name = data.name?.trim();

  if (!name || name.length < 2) {
    showToast('Department name must be at least 2 characters long', 'error');
    return false;
  }

  data.name = name;
  data.description = data.description?.trim() || '';

  return true;
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const type = form.dataset.type;
  const id = form.dataset.id;

  if (type === 'employee' && !validateEmployeeFormData(data)) return;
  if (type === 'department' && !validateDepartmentFormData(data)) return;

  if (type === 'opening') {
    if (id) {
      const idx = allOpenings.findIndex(o => o.id === parseInt(id, 10));
      if (idx !== -1) {
        allOpenings[idx] = { ...allOpenings[idx], ...data };
      }
    } else {
      allOpenings.push({ id: Date.now(), ...data });
    }

    saveOpenings();
    closeModal();
    showToast(`Opening ${id ? 'updated' : 'created'} successfully`, 'success');
    loadOpenings();
    return;
  }

  const method = id ? 'PUT' : 'POST';
  const url = `${API}/${type}s${id ? `/${id}` : ''}`;

  showLoading(true);

  try {
    await apiRequest(url, {
      method,
      headers: authHeaders(true),
      body: JSON.stringify(data),
    });

    closeModal();
    showToast(`${type} ${id ? 'updated' : 'created'} successfully`, 'success');
    await refreshByType(type);
  } catch (err) {
    showToast(err.message || 'Operation failed', 'error');
  } finally {
    showLoading(false);
  }
}

function closeModal() {
  document.getElementById('modal')?.classList.add('hidden');
  document.getElementById('entityForm')?.reset();
}

function showConfirmModal(title, message) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmModal')?.classList.remove('hidden');
}

function closeConfirm() {
  document.getElementById('confirmModal')?.classList.add('hidden');
}

function showLoading(show) {
  const overlay = document.getElementById('loadingOverlay');
  if (!overlay) return;

  if (show) {
    overlay.classList.remove('hidden');
  } else {
    overlay.classList.add('hidden');
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
  };

  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Open Roles ────────────────────────────────────────────────────────────────

function saveOpenings() {
  localStorage.setItem('openings', JSON.stringify(allOpenings));
  updateOpeningsBadge();
}

function updateOpeningsBadge() {
  const badge = document.getElementById('openingsBadge');
  if (badge) badge.textContent = allOpenings.length;
}

function loadOpenings() {
  renderOpenings(allOpenings);
  updateOpeningsBadge();
}

function renderOpenings(list) {
  const grid = document.getElementById('openingsGrid');
  const empty = document.getElementById('emptyOpenings');
  if (!grid) return;

  grid.innerHTML = '';

  if (list.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  list.forEach(o => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <div class="job-card-header">
        <span class="job-badge ${
          o.type === 'Full-time'
            ? 'badge-green'
            : o.type === 'Part-time'
            ? 'badge-yellow'
            : 'badge-blue'
        }">${o.type}</span>
        ${user?.role === 'admin'
          ? `
          <div class="action-buttons" style="margin-left:auto">
            <button class="action-btn edit" onclick="editOpening(${o.id})" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete" onclick="deleteOpening(${o.id})" title="Delete"><i class="fas fa-trash"></i></button>
          </div>`
          : ''}
      </div>
      <h3 class="job-title">${o.title}</h3>
      <p class="job-dept"><i class="fas fa-building"></i> ${o.department}</p>
      <p class="job-desc">${o.description || ''}</p>
      <div class="job-footer">
        <span class="job-salary"><i class="fas fa-dollar-sign"></i> ${o.salary || 'Negotiable'}</span>
        <button class="btn btn-primary" style="padding:0.5rem 1rem;font-size:0.875rem" onclick="openApplyModal(${o.id})">Apply Now</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterOpenings() {
  const q = document.getElementById('openingSearch')?.value.toLowerCase() || '';
  renderOpenings(
    allOpenings.filter(o =>
      o.title.toLowerCase().includes(q) || o.department.toLowerCase().includes(q)
    )
  );
}

function showOpeningForm(id = null) {
  const o = id ? allOpenings.find(x => x.id === id) : null;
  const title = document.getElementById('modalTitle');
  const form = document.getElementById('entityForm');
  if (!title || !form) return;

  title.textContent = id ? 'Edit Opening' : 'Add Opening';
  form.dataset.type = 'opening';
  form.dataset.id = id || '';
  form.innerHTML = `
    <div class="form-group">
      <label>Job Title *</label>
      <input type="text" name="title" class="form-control" value="${o?.title || ''}" required>
    </div>
    <div class="form-group">
      <label>Department *</label>
      <input type="text" name="department" class="form-control" value="${o?.department || ''}" required>
    </div>
    <div class="form-group">
      <label>Type</label>
      <select name="type" class="form-select">
        ${['Full-time', 'Part-time', 'Contract']
          .map(t => `<option ${o?.type === t ? 'selected' : ''}>${t}</option>`)
          .join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Salary Range</label>
      <input type="text" name="salary" class="form-control" value="${o?.salary || ''}" placeholder="e.g. $60k–$80k">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea name="description" class="form-control" rows="3" style="resize:vertical">${o?.description || ''}</textarea>
    </div>
    <div class="form-actions">
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> ${id ? 'Update' : 'Save'}</button>
    </div>
  `;

  document.getElementById('modal')?.classList.remove('hidden');
}

function editOpening(id) {
  showOpeningForm(id);
}

function deleteOpening(id) {
  currentDeleteId = id;
  currentDeleteType = 'opening';
  showConfirmModal('Delete Opening', 'Are you sure you want to delete this job opening?');
}

function openApplyModal(id) {
  const opening = allOpenings.find(x => x.id === id);
  if (!opening) return;

  document.getElementById('applyJobTitle').textContent = opening.title;
  document.getElementById('applyForm').dataset.id = id;
  document.getElementById('applyForm').reset();
  document.getElementById('applyModal')?.classList.remove('hidden');
}

function closeApply() {
  document.getElementById('applyModal')?.classList.add('hidden');
}

function handleApplySubmit(e) {
  e.preventDefault();
  closeApply();
  showToast('Application submitted successfully!', 'success');
}