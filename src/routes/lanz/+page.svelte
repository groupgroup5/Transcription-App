<script lang="ts">
    import { Button } from "$components/ui/button"
    import { Input } from "$components/ui/input"
    import { Label } from "$components/ui/label"
    import {
            Sheet,
            SheetClose,
            SheetContent,
            SheetDescription,
            SheetFooter,
            SheetHeader,
            SheetTitle,
            SheetTrigger,
    } from "$components/ui/sheet"
</script>

<div class="flex h-screen">
    <div class="m-auto">
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Lanz's Profile</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Profile</SheetTitle>
                <SheetDescription>
                  
                </SheetDescription>
              </SheetHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right">
                    Name
                  </Label>
                  <Input id="name" value="Lanz Conanan" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="username" class="text-right">
                    UID
                  </Label>
                  <Input id="username" value="12345678" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="password" class="text-right">
                      Password
                    </Label>
                    <Input id="password" type="password" class="col-span-3" />
                  </div>
              </div>
            </SheetContent>
        </Sheet>
    </div>
</div>