import { useMoralis } from 'react-moralis';

function ChangeUsername() {
    const { user, setUserData, isUserUpdating, userError } = useMoralis()

    const setUsername = () => {
        const username = prompt(`Please, enter your new username (current username: ${user.getUsername()})`)

        if (!username) return;

        setUserData({
            username
        })
    }

    return (
        <div className="text-sm absolute top-5 right-5">
            <button
                onClick={setUsername}
                disabled={isUserUpdating}
                className="hover:text-pink-700">Change Username</button>
        </div>
    )
}

export default ChangeUsername
