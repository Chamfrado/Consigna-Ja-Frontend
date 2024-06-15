import React, { useContext } from "react";
import { Toggle, Icon, Layout, Text } from '@ui-kitten/components';
import { ThemeContext } from "../context/theme-context";

export const ThemeButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const onCheckedChange = () => {
        toggleTheme();
    };

    return (
        <Layout level="1">
            <Toggle
                style={{ paddingTop: 10 }}
                checked={theme === 'dark'}
                onChange={onCheckedChange}
                size='large'
            >
                {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
            </Toggle>
        </Layout>


    );
};
