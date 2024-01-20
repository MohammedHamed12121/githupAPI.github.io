export const displayUserInfo = (userData) => {
    const userInfoElement = document.getElementById('user-info');

    userInfoElement.innerHTML = `
                <div class="container m-5">
                <div class='row '>
                    <div class='col-3'>
                        <img src='${userData.avatar_url}' class="img-fluid round-image"></img>
                        <p class='d-flex'>
                            <span class="material-symbols-outlined pr-2"> link </span>
                            <a href="${userData.html_url}" class="link">
                            ${userData.html_url}
                            </a>
                        </p>
                    </div>
                    <div class='col-9'>
                        <h3>${userData.name ?? "user didn't set a name"}</h3>
                        <p> ${userData.bio ?? "user didn't set a bio"}</p>
                        <p class='d-flex'> <span class="material-symbols-outlined pr-2"> location_on </span> 
                        ${userData.location ?? "user didn't set a location"}</p>
                        <p class='d-flex'>
                            <span class="mr-2"> Twitter:  </span>
                            <a href="https://twitter.com/${userData.twitter_username}" >
                            
                            ${userData.twitter_username !== null ? 'https://twitter.com/' + userData.twitter_username : "user didn't set a twitter account"}
                            </a>
                        </p>
                    </div>
                </div>
                </div>
        `;
};

export const displayRepos = (reposData) => {
    const reposElement = document.getElementById('user-repos');
    const repoList = document.createElement('ul');
    repoList.classList.add('row', 'col-12')
    reposData.forEach((repo) => {
        let topics = [];
        if (repo.topics.length > 0) {
            repo.topics.forEach(t => topics.push(`<p class='badge badge-primary p-2'>${t}</p>`))
        }
        const repoItem = document.createElement('li');
        repoItem.classList.add('list-unstyled', 'm-2', 'border', 'col-5')
        repoItem.innerHTML = `
                <div>
                <h3 class='p-2'> <a href="${repo.html_url}">${repo.name}</a></h3>
                <p class='p-2'><strong> ${repo.description ?? "there is no description"}</strong></p>
                ${topics.join(' ')}
            `;
        repoList.appendChild(repoItem);
        repoList.appendChild(repoItem);
    });

    reposElement.innerHTML = '<h2>Repositories:</h2>';
    reposElement.appendChild(repoList);
};