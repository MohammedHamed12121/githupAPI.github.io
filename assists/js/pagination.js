import { loadUserInfo } from "./loadingInfo.js";


export const pagination = (totalRepos) => {
    totalPages = Math.ceil(totalRepos / reposPerPage);
    const paginationElement = document.getElementById('pagination');

    paginationElement.innerHTML = '';

    if (totalPages > 1) {

        // previous item
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.textContent = 'Previous';
        prevLink.addEventListener('click', () => handlePagination('prev'));
        prevItem.appendChild(prevLink);
        paginationElement.appendChild(prevItem);

        // page items
        minPage = Math.max(1, currentReposPage - 3)
        maxPage = Math.min(currentReposPage + 4, totalPages)

        if (minPage > 1) {
            const prevItem = document.createElement('li');
            prevItem.classList.add('page-item');
            const prevLink = document.createElement('a');
            prevLink.classList.add('page-link');
            prevLink.textContent = '.....';
            prevItem.appendChild(prevLink);
            paginationElement.appendChild(prevItem);
        }


        for (let i = minPage; i <= maxPage; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentReposPage) {
                pageItem.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.classList.add('active');
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => handlePageClick(i));
            pageItem.appendChild(pageLink);
            paginationElement.appendChild(pageItem);
        }

        if (maxPage < totalPages) {
            const prevItem = document.createElement('li');
            prevItem.classList.add('page-item');
            const prevLink = document.createElement('a');
            prevLink.classList.add('page-link');
            prevLink.textContent = '.....';
            prevItem.appendChild(prevLink);
            paginationElement.appendChild(prevItem);
        }

        // next item
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.textContent = 'Next';
        nextLink.addEventListener('click', () => handlePagination('next'));
        nextItem.appendChild(nextLink);
        paginationElement.appendChild(nextItem);
    }
};

export const handlePagination = (direction) => {
    if (direction === 'next' && currentReposPage !== totalPages) {
        currentReposPage++;
    } else if (direction === 'prev' && currentReposPage > 1) {
        currentReposPage--;
    }

    loadUserInfo(username);
};

export const handlePageClick = (clickedPage) => {
    currentReposPage = clickedPage;
    loadUserInfo(username)
};