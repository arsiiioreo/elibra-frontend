<template>
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th>ID</th>
                <th>Accession Code</th>
                <th>Borrower</th>
                <th>Date Borrowed</th>
                <th>Date of Return</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="b in borrowing" :key="b.id">
                <td>{{ b.id }}</td>
                <td>{{ b.code }}</td>
                <td>{{ b.ebc }}</td>
                <td>{{ b.date_borrowed }}</td>
                <td>{{ b.date_of_return }}</td>
                <td class="text-center vstack gap-2">
                    <button class="btn btn-primary"><i class="bi bi-eye me-1"></i>View</button>
                    <button class="btn btn-warning"><i class="bi bi-pencil me-1"></i>Edit</button>
                    <button class="btn btn-danger"><i class="bi bi-trash me-1"></i>Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        borrowing: { type: Array, default: () => [] },
    },
};
</script>

