import { Text } from "@ui-kitten/components";

export const StyledText = (props) => {
    const { category, children, ...restProps } = props;

    return (
        <Text {...restProps} category={category ? category : "c1"} status="primary">
            {children}
        </Text>
    );
};
