document.addEventListener('DOMContentLoaded', function () {
    let stockList = [];

    if (localStorage.getItem('stockList')) {
        stockList = JSON.parse(localStorage.getItem('stockList'));
    }

    function renderStockList(list) {
        const stockListContainer = document.getElementById('stockList');
        stockListContainer.innerHTML = '';

        list.forEach(function (item) {
            const stockItem = document.createElement('div');
            stockItem.classList.add('mb-3', 'border', 'p-3');
           

            stockItem.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Marca:</strong> ${item.brand}</p>
                <p><strong>Modelo:</strong> ${item.model}</p>
                <p><strong>Preço:</strong> ${item.price}€</p>
                <p><strong>Quantidade em Stock:</strong> ${item.quantity <= 2 ? `<span class="text-danger">${item.quantity}</span>` : item.quantity}</p>
                <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Remover</button>
            `;
            stockListContainer.appendChild(stockItem);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEdit);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDelete);
        });
    }

    renderStockList(stockList);

    const addForm = document.getElementById('addForm'); 
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = addForm.elements.name.value;
        const brand = addForm.elements.brand.value;
        const model = addForm.elements.model.value;
        const price = parseFloat(addForm.elements.price.value);
        const quantity = parseInt(addForm.elements.quantity.value);

        const newItem = {
            id: Date.now(),
            name: name,
            brand: brand,
            model: model,
            price: price,
            quantity: quantity
        };

        stockList.push(newItem);

        localStorage.setItem('stockList', JSON.stringify(stockList));

        renderStockList(stockList);

        $('#addModal').modal('hide');

        addForm.reset(); 
    });

    function handleEdit(event) {
        const itemId = parseInt(event.target.dataset.id);
        const itemIndex = stockList.findIndex(item => item.id === itemId);
    
        if (itemIndex !== -1) {
            const item = stockList[itemIndex];
            document.getElementById('editName').value = item.name;
            document.getElementById('editBrand').value = item.brand;
            document.getElementById('editModel').value = item.model;
            document.getElementById('editPrice').value = item.price;
            document.getElementById('editQuantity').value = item.quantity;
    
            $('#editModal').modal('show');
    
            const editForm = document.getElementById('editForm');
            editForm.removeEventListener('submit', handleEditSubmit);
    
            editForm.addEventListener('submit', handleEditSubmit);
    
            function handleEditSubmit(event) {
                event.preventDefault();
    
                stockList[itemIndex].name = editForm.elements.editName.value;
                stockList[itemIndex].brand = editForm.elements.editBrand.value;
                stockList[itemIndex].model = editForm.elements.editModel.value;
                stockList[itemIndex].price = parseFloat(editForm.elements.editPrice.value);
                stockList[itemIndex].quantity = parseInt(editForm.elements.editQuantity.value);
    
                localStorage.setItem('stockList', JSON.stringify(stockList));
    
                renderStockList(stockList);
    
                $('#editModal').modal('hide');
    
                editForm.removeEventListener('submit', handleEditSubmit);
            }
        }
    }
    
    
    function handleDelete(event) {
        const itemId = parseInt(event.target.dataset.id);
        const itemIndex = stockList.findIndex(item => item.id === itemId);

        if (itemIndex !== -1) {
            stockList.splice(itemIndex, 1);

            localStorage.setItem('stockList', JSON.stringify(stockList));

            renderStockList(stockList);
        }
    }


     const searchButton = document.getElementById('searchButton');
     searchButton.addEventListener('click', function () {
         const searchTerm = document.getElementById('searchInput').value.toLowerCase();
         const filteredList = stockList.filter(item => item.name.toLowerCase().includes(searchTerm));
         renderStockList(filteredList);
     });

      document.getElementById('logoutLink').addEventListener('click', function() {
      localStorage.removeItem('username'); 
      localStorage.removeItem('password'); 
      window.location.href = 'login.html'; 
      });


});

