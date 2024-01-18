document.addEventListener('DOMContentLoaded', function () {
    let username = 'johnpapa';
    let reposPerPage = 10;
    let currentReposPage = 1;

    window.searchUsers = () => {
        const searchInput = document.getElementById('search');
        const searchTerm = searchInput.value.trim();
        console.log(searchTerm)
        if (searchTerm !== '') {
            username = searchTerm
            fetchGitHubUser(searchTerm);
        } else {
            
            fetchGitHubUser(username);
        }
    };

    const fetchGitHubUser = async () => {
        const userUrl = `https://api.github.com/users/${username}`;
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await fetch(userUrl, { headers });
            const userData = await response.json();

            displayUserInfo(userData);

            await fetchAndDisplayRepos(username);


        } catch (error) {
            console.error(`Error fetching GitHub user ${username}:`, error);
        }
    };

    const displayUserInfo = (userData) => {
        const userInfoElement = document.getElementById('user-info');

        const paginationElement = document.getElementById('pagination');

        userInfoElement.innerHTML = `
            <img src='${userData.avatar_url}'></img>
            <p><strong>GitHub Profile:</strong> <a href="${userData.html_url}" target="_blank">${userData.html_url}</a></p>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Bio:</strong> ${userData.bio}</p>
            <p><strong>Location:</strong> ${userData.location}</p>
            <p><strong>Public Repositories:</strong> ${userData.public_repos}</p>
        `;

        updatePagination(userData.public_repos);
    };

    window.changeItemsPerPage = () => {
        const itemsPerPageInput = document.getElementById('itemsPerPage');
        // the default is 10
        let newValue = parseInt(itemsPerPageInput.value, 10);
        
        // from 1 to 100 
        newValue = Math.min(Math.max(newValue, 1), 100);
        console.log(newValue)

        reposPerPage = newValue;
        currentReposPage = 1;
        fetchAndDisplayRepos(username);
    };

    const updatePagination = (totalUsers) => {
        const totalPages = Math.ceil(totalUsers / reposPerPage);
        const paginationElement = document.getElementById('pagination');

        paginationElement.innerHTML = '';

        // previous item
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.setAttribute('href', '#');
        prevLink.textContent = 'Previous';
        prevLink.addEventListener('click', () => handlePagination('prev'));
        prevItem.appendChild(prevLink);
        paginationElement.appendChild(prevItem);

        // page items
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.setAttribute('href', '#');
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => handlePageClick(i));
            pageItem.appendChild(pageLink);
            paginationElement.appendChild(pageItem);
        }

        // next item
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.setAttribute('href', '#');
        nextLink.textContent = 'Next';
        nextLink.addEventListener('click', () => handlePagination('next'));
        nextItem.appendChild(nextLink);
        paginationElement.appendChild(nextItem);
    };


    const fetchAndDisplayRepos = async (username) => {
        const repoUrl = `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}&page=${currentReposPage}`;
        const headers = { Authorization: `Bearer ${token}` };

        showLoader();

        try {
            const response = await fetch(repoUrl, { headers });
            const reposData = await response.json();

            displayRepos(reposData);
        } catch (error) {
            console.error(`Error fetching repositories for ${username}:`, error);
        }
    };

    const showLoader = () => {
        const loaderElement = document.getElementById('loader');
        loaderElement.style.display = 'block';
    };

    const hideLoader = () => {
        const loaderElement = document.getElementById('loader');
        loaderElement.style.display = 'none';
    };
    const displayRepos = (reposData) => {
        const reposElement = document.getElementById('user-repos');
        const repoList = document.createElement('ul');

        reposData.forEach((repo) => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
                <p><strong>Repository:</strong> <a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
                <p><strong>Description:</strong> ${repo.description}</p>
                <p><strong>topics:</strong> ${repo.topics}</p>
            `;
            repoList.appendChild(repoItem);
            hideLoader();
        });

        reposElement.innerHTML = '<h2>Repositories:</h2>';
        reposElement.appendChild(repoList);
    };

    const handlePagination = (direction) => {
        if (direction === 'next') {
            currentReposPage++;
        } else if (direction === 'prev' && currentReposPage > 1) {
            currentReposPage--;
        }
        
        fetchAndDisplayRepos(username);
    };

    const handlePageClick = (clickedPage) => {
        currentReposPage = clickedPage;
        fetchAndDisplayRepos(username);
    };

    fetchGitHubUser();
});
