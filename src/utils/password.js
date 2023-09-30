import bcrypt from 'bcrypt';

export const generateHashPassword = async(password) => {
    return await bcrypt.hash(password , 10);
}
export const matchPassword = async(password, storedPassword) => {
    return await bcrypt.compare(password, storedPassword);
}