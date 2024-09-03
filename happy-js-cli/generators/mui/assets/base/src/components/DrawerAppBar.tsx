import React, { useLayoutEffect, useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Box, Divider, Drawer, IconButton,
  List, ListItem, ListItemButton, ListItemText,
  Toolbar, Button, Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import navItems from './navItems';

const drawerWidth = 240;

function DrawerAppBar({ children }: React.PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [height, setHeight] = useState(64);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let newHeight = ref?.current?.clientHeight;
    if (!newHeight) {
      newHeight = ref2?.current?.clientHeight;
    }
    setHeight(newHeight || 0);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.link} disablePadding>
            <ListItemButton component={RouterLink} to={item.link} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar ref={ref} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.link} component={RouterLink} to={item.link} sx={{ color: '#fff' }}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" ref={ref2}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" flexGrow={1} marginTop={`${height}px`}>
        {children && children}
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
