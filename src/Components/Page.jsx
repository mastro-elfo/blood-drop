import React, {Fragment} from 'react';

export default function Page (props) {
	const {
		Header, HeaderProps,
		Content, ContentProps,
		Drawer, DrawerProps,
		...others} = props;
	return (
		<Fragment>
			{
				Drawer &&
				<Drawer {...DrawerProps} {...others}/>
			}
			{
				Header &&
				<Header {...HeaderProps} {...others}/>
			}
			{
				Content &&
				<Content {...ContentProps} {...others}/>
			}
		</Fragment>
	);
}
