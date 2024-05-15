import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import Item from "./dropdown-menu-item.svelte";
import Label from "./dropdown-menu-label.svelte";
import Content from "./dropdown-menu-content.svelte";
import Shortcut from "./dropdown-menu-shortcut.svelte";
import Separator from "./dropdown-menu-separator.svelte";

const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;
const Trigger = DropdownMenuPrimitive.Trigger;
const Group = DropdownMenuPrimitive.Group;

export {
	Sub,
	Root,
	Item,
	Label,
	Group,
	Trigger,
	Content,
	Shortcut,
	Separator,
	//
	Root as DropdownMenu,
	Sub as DropdownMenuSub,
	Item as DropdownMenuItem,
	Label as DropdownMenuLabel,
	Group as DropdownMenuGroup,
	Content as DropdownMenuContent,
	Trigger as DropdownMenuTrigger,
	Shortcut as DropdownMenuShortcut,
	Separator as DropdownMenuSeparator,
};
