
from gpiozero import LED
from time import sleep

# Start with the pins off
toggle1 = LED(17, initial_value=True)
toggle2 = LED(18, initial_value=True)
toggle3 = LED(23, initial_value=True)
toggle4 = LED(24, initial_value=True)

# Since we started with the pins off,
# ON = OFF and viceversa

toggle1.off()
sleep(2)
toggle1.on()

# We can also use toggle to flip the current value

toggle2.toggle()
sleep(2)
toggle2.toggle()

toggle3.toggle()
sleep(2)
toggle3.toggle()

toggle4.toggle()
sleep(2)
toggle4.toggle()
