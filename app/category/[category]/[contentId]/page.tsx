import React from 'react';

interface ContentPageProps {
    params: {
        contentId: string;
    };
}

const ContentPage = ({ params }: ContentPageProps) => {
    return <div>{params.contentId}</div>;
};

export default ContentPage;
