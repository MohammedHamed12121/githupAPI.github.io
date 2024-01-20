import { handlePageClick } from "./pagination.js";
import { loadUserInfo } from "./loadingInfo.js";

document.addEventListener('DOMContentLoaded', async function () {
    loadUserInfo(username)

    // enable enter while you type the user search 
    let enterSearch = document.getElementById('search');
    enterSearch.addEventListener('keypress', function (event) {
        // key code 13 is enter key
        if (event.keyCode === 13) {
            searchUsers()
        }
    });

    window.searchUsers = () => {
        let searchInput = document.getElementById('search');
        let searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            username = searchTerm
            loadUserInfo(searchTerm)
        }
    };

    // enable enter while you type the repos search 
    let enterRepoSearch = document.getElementById('repoSearch');
    enterRepoSearch.addEventListener('keypress', function (event) {
        // key code 13 is enter key
        if (event.keyCode === 13) {
            searchRepositories()
        }
    });
    window.searchRepositories = () => {
        const repoSearchInput = document.getElementById('repoSearch');
        const repoSearchTerm = repoSearchInput.value.trim();
        if (repoSearchTerm === '') {
            loadUserInfo(username)
        } else {
            loadUserInfo(username, repoSearchTerm)
        }
    };

    window.changeItemsPerPage = () => {
        const itemsPerPageInput = document.getElementById('itemsPerPage');
        // the default is 10
        let newValue = parseInt(itemsPerPageInput.value, 10);
        // from 1 to 100 
        newValue = Math.min(Math.max(newValue, 1), 100);

        reposPerPage = newValue;
        currentReposPage = 1;
        loadUserInfo(username);
    };

    window.newerPagination = () => {
        const totalPages = Math.ceil(userReposCount / reposPerPage);
        handlePageClick(totalPages)
    }

    window.olderPagination = () => {
        handlePageClick(1)
    }
});
