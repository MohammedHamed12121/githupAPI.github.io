document.addEventListener('DOMContentLoaded', function () {
    let username = 'johnpapa';
    let reposPerPage = 10;
    let currentReposPage = 1;
    let userRepos;

    window.searchUsers = () => {
        let searchInput = document.getElementById('search');
        let searchTerm = searchInput.value.trim();
        console.log(searchTerm)
        if (searchTerm !== '') {
            username = searchTerm
            fetchGitHubUser(searchTerm);
        } else {

            fetchGitHubUser(username);
        }
    };

    window.searchRepositories = () => {
        const repoSearchInput = document.getElementById('repoSearch');
        const repoSearchTerm = repoSearchInput.value.trim();
        console.log(repoSearchTerm)
        if (repoSearchTerm !== '') {
            fetchGitHubRepositories(repoSearchTerm);
        } else {
            fetchGitHubRepositories();
        }
    };

    const fetchGitHubUser = async () => {
        // https://api.github.com/users/johnpapa
        const userUrl = `https://api.github.com/users/${username}`;
        const headers = { Authorization: `Bearer ${token}` };


        showLoader();
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

        userInfoElement.innerHTML = `
            
                <div class='row m-5'>
                    <div class='col-3'>
                        <img src='${userData.avatar_url}' class="img-fluid round-image"></img>
                        <p class='d-flex'>
                        <span class="material-symbols-outlined pr-2"> link </span>
                        <a href="${userData.html_url}" >
                        
                        ${userData.html_url}</a></p>
                    </div>
                    <div class='col-4'>
                        <h3>${userData.name}</h3>
                        <p> ${userData.bio}</p>
                        <p class='d-flex'> <span class="material-symbols-outlined pr-2"> location_on </span> 
                        ${userData.location}</p>
                    </div>
                </div>
            
        `;

        userRepos = userData.public_repos
        updatePagination(userRepos);
    };

    window.changeItemsPerPage = () => {
        const itemsPerPageInput = document.getElementById('itemsPerPage');
        // the default is 10
        let newValue = parseInt(itemsPerPageInput.value, 10);

        // from 1 to 100 
        newValue = Math.min(Math.max(newValue, 1), 100);
        // console.log(newValue)

        reposPerPage = newValue;
        currentReposPage = 1;
        fetchAndDisplayRepos(username);
        updatePagination(userRepos);
    };

    const updatePagination = (totalRepos) => {
        const totalPages = Math.ceil(totalRepos / reposPerPage);
        const paginationElement = document.getElementById('pagination');
        console.log(`total repos: ${totalRepos}`)
        console.log(`total repos: ${reposPerPage}`)

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
        console.log(`item per page ${totalPages}`)
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
        // https://api.github.com/users/johnpapa/repos?per_page=10&page=1
        const repoUrl = `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}&page=${currentReposPage}`;
        const headers = { Authorization: `Bearer ${token}` };

        showLoader();

        try {
            const response = await fetch(repoUrl, { headers });
            const reposData = await response.json();
            console.log(reposData)
            displayRepos(reposData);
            updatePagination(userRepos)
        } catch (error) {
            console.error(`Error fetching repositories for ${username}:`, error);
        }
    };

    const fetchGitHubRepositories = async (searchTerm = '') => {
        // https://api.github.com/search/repositories?q=user:exampleuser+example
        const url = `https://api.github.com/search/repositories?q=user:${username}+${searchTerm}`;
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await fetch(url, { headers });
            const repositoriesData = await response.json();
            console.log(repositoriesData.items)
            displayRepos(repositoriesData.items);
            updatePagination(userRepos);
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
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
        repoList.classList.add('row','col-12')
        reposData.forEach((repo) => {
            let topics = [];
            if(repo.topics.length > 0){
                repo.topics.forEach(t => topics.push(`<p class='btn btn-primary '>${t}</p>`))
            }
            const repoItem = document.createElement('li');
            repoItem.classList.add('list-unstyled','m-2','border','col-5')
            repoItem.innerHTML = `
                <div>
                <h3 class='p-2'> <a href="${repo.html_url}">${repo.name}</a></h3>
                <p class='p-2'><strong> ${repo.description}</strong></p>
                ${topics.join(' ')}
            `;
            repoList.appendChild(repoItem);
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
