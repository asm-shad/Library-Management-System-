interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "Librarian" | "Customer";
}