document.addEventListener('DOMContentLoaded', function () {
    const token = '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';
    const perPage = 10;
    let currentPage = 1;


    const fetchGitHubUser = async (username) => {
        const url = `https://api.github.com/users/${username}`;
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await fetch(url, { headers });
            const userData = await response.json();

            displayUserInfo(userData);
        } catch (error) {
            console.error('Error fetching GitHub user:', error);
        }
    };


    const displayUserInfo = (userData) => {
        const userInfoElement = document.getElementById('user-info');
        userInfoElement.innerHTML = `
            <p><strong>Username:</strong> ${userData.login}</p>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Location:</strong> ${userData.location}</p>
            <p><strong>Public Repositories:</strong> ${userData.public_repos}</p>
            <p><strong>GitHub Profile:</strong> <a href="${userData.html_url}" target="_blank">${userData.html_url}</a></p>
        `;
    };

    
    const targetUsername = 'johnpapa';
    fetchGitHubUser(targetUsername);
});
