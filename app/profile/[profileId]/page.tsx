interface PropfilePageProps {
  params: {
    profileId: string;
  };
}

const ProfilePage = ({ params }: PropfilePageProps) => {
  return <div>{params.profileId}</div>;
};

export default ProfilePage;
