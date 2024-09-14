import CollaboratorType from "@/components/CollaboratorType";

const typeMap = {
    'stubble-purchasing': 'STUBBLE_PURCHASING_COMPANY',
    'machine-rental': 'MACHINE_RENTAL',
    'transportation': 'TRANSPORTATION_COMPANY',
    'agriculture-shops': 'AGRICULTURE_SHOPS',
} as const;

type ValidParamType = keyof typeof typeMap;
type CollaborationType = typeof typeMap[ValidParamType];

const formatType = (type: ValidParamType): CollaborationType => {
    return typeMap[type];
};

const titleMap: Record<ValidParamType, string> = {
    'stubble-purchasing': 'Stubble Purchasing Companies',
    'machine-rental': 'Machine Rental Companies',
    'transportation': 'Transportation Companies',
    'agriculture-shops': 'Agriculture Shops',
};

type PageProps = {
    params: {
        type: ValidParamType
    }
};

export default function Page({ params }: PageProps) {
    const collaborationType = formatType(params.type);
    const title = titleMap[params.type];

    return (
        <CollaboratorType
            type={collaborationType}
            title={title}
        />
    );
}

