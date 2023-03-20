<script>
  let products = [];
  let newTransactionData = {
    productId: "",
    fromLocation: "",
    toLocation: "",
    quantity: 0,
  };

  async function getProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    products = data;
  }

  async function addTransaction() {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransactionData),
    });
    const data = await res.json();
    products = data;
    newTransactionData = {
      productId: "",
      fromLocation: "",
      toLocation: "",
      quantity: 0,
    };
  }
</script>

<main>
  <h1>Supply Chain Management</h1>
  <form on:submit|preventDefault={addTransaction}>
    <label>
      Product ID:
      <input type="text" bind:value={newTransactionData.productId}>
    </label>
    <label>
      From Location:
      <input type="text" bind:value={newTransactionData.fromLocation}>
    </label>
    <label>
      To Location:
      <input type="text" bind:value={newTransactionData.toLocation}>
    </label>
    <label>
      Quantity:
      <input type="number" bind:value={newTransactionData.quantity}>
    </label>
    <button>Add Transaction</button>
  </form>
  <table>
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Current Location</th>
        <th>Transaction History</th>
      </tr>
    </thead>
    <tbody>
      {#each products as product}
        <tr>
          <td>{product.id}</td>
          <td>{product.location}</td>
          <td>
            <ul>
              {#each product.transactions as transaction}
                <li>{JSON.stringify(transaction)}</li>
              {/each}
            </ul>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
