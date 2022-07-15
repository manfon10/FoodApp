const GetConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('tokenUser')}`}
});

export default GetConfig;