import Image from "next/image";

const MiniProfile = ({ user }) => {
  return (
    <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-96 p-2 space-y-2">
      <h3 className="text-black font-bold text-2xl">
        Hello, {user.name || "Name"}!
      </h3>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={user.ProfilePictureUrl || "/user.png"}
          alt="user"
          width={100}
          height={100}
        />
        <p className="text-black text-2xl">@{user.username || "username"}</p>
      </div>
    </div>
  );
};

export default MiniProfile;
