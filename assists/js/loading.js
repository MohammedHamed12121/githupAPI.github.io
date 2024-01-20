export const showLoader = () => {
    const loaderElement = document.getElementById('loader');
    loaderElement.style.display = 'block';
};

export const hideLoader = () => {
    const loaderElement = document.getElementById('loader');
    loaderElement.style.display = 'none';
};