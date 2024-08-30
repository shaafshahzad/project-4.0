const FeatureBlock = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
    return (
        <div className="flex flex-col w-full text-center max-w-xs"> 
            <div className="flex items-center flex-col gap-4">
                {icon}
                <h1 className="text-xl font-medium">{title}</h1>
                <p className="text-md font-thin">{description}</p>
            </div>
        </div>
    );
}

export default FeatureBlock