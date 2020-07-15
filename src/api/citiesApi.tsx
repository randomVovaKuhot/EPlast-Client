import api from "./api";

export const getCityById = async (id: number) => {
    try {
        return await api.getById('/api/Cities/Profile/', id);
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllCities = async () => {
    try {
        return api.getAll('/api/Cities/Profiles');
    } catch (error) {
        throw new Error(error);
    }
}

export const createCity = async (data: any) => {
    try {
        return api.post('/api/Cities/CreateCity', data);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateCity = async (id: number, data: any) => {
    try {
        return api.put(`/api/Cities/EditCity/${id}`, data);
    } catch (error) {
        throw new Error(error);
    }
}

export const getLogo = async (logoName: string) => {
    try {
        return api.get('/api/Cities/LogoBase64', {logoName});
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllAdmins = async (id: number) => {
    try {
        return api.getAll(`/api/Cities/Admins/${id}`);
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllDocuments = async (id: number) => {
    try {
        return api.getAll(`/api/Cities/Documents/${id}`);
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllMembers = async (id: number) => {
    try {
        return api.getAll(`/api/Cities/Members/${id}`);
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllFollowers = async (id: number) => {
    try {
        return api.getAll(`/api/Cities/Followers/${id}`);
    } catch (error) {
        throw new Error(error);
    }
}