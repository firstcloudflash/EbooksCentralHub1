document.addEventListener('DOMContentLoaded', function() {
    fetch('/content')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            data.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `<h3>${item.title}</h3><p>${item.author}</p><p>${item.price}</p>`;
                contentDiv.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error fetching content:', error));
});
