const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNzM5MywiZXhwIjoxOTU2OTEzMzkzfQ.5E636TNNCxoTJtTExSwOutzpIBjtS4WLgOnqfXdnvvM';

const SUPABASE_URL = 'https://igyvpimxugpyxqzzyuep.supabase.co';


const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function buyListItem(anId) {
    const response = await client
        .from('shopping-list')
        .update({ bought: true })
        .match({ id: anId });
    return checkError(response);
}

export async function getListItem() {
    const response = await client
        .from('shopping-list')
        .select();
    return checkError(response);
}

export async function createListItem(item, quantity) {
    const response = await client
        .from('shopping-list')
        .insert([{ item, quantity }]);
    return checkError(response);
}

export async function deleteAllListItems() {
    const response = await client
        .from('shopping-list')
        .delete();
    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
