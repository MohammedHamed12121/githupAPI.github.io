export const fetchGitHubUser = async (githubUsername) => {
    // https://api.github.com/users/johnpapa
    const userUrl = `https://api.github.com/users/${githubUsername}`;
    const headers = { Authorization: `Bearer ${token}` };
    try {
        const response = await fetch(userUrl, { headers });
        const userData = await response.json();
        return userData
    } catch (error) {
        console.error(`Error fetching GitHub user ${githubUsername}:`, error);
    }
};

export const fetchUserRepos = async (username) => {
    // https://api.github.com/users/johnpapa/repos?per_page=10&page=1
    const repoUrl = `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}&page=${currentReposPage}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
        const response = await fetch(repoUrl, { headers });
        const reposData = await response.json();
        return reposData
    } catch (error) {
        console.error(`Error fetching repositories for ${username}:`, error);
    }
};

export const fetchReposSearchTerm = async (username, searchTerm) => {
    // https://api.github.com/search/repositories?q=user:exampleuser+example
    const url = `https://api.github.com/search/repositories?q=user:${username}+${searchTerm}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
        const response = await fetch(url, { headers });
        const repositoriesData = await response.json();
        userReposCount = repositoriesData.items.length
        return repositoriesData;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
    }
};