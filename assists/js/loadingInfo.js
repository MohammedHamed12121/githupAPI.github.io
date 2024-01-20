import { showLoader, hideLoader } from "./loading.js";
import { fetchGitHubUser, fetchUserRepos, fetchReposSearchTerm } from "./api.js";
import { displayRepos, displayUserInfo } from "./display.js";
import { pagination } from "./pagination.js";

export const loadUserInfo = async (username, searchTerm = '') => {
    showLoader();
    githubUserData = await fetchGitHubUser(username);
    displayUserInfo(githubUserData);
    if (searchTerm === '') {
        userRepos = await fetchUserRepos(username);
        userReposCount = githubUserData.public_repos
    } else {
        userRepos = await fetchReposSearchTerm(username, searchTerm);
        userRepos = userRepos.items
    }
    displayRepos(userRepos)
    hideLoader()
    pagination(userReposCount)
}