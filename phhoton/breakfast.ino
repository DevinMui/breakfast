// This #include statement was automatically added by the Particle IDE.
#include <SparkJson.h>
// #include "InternetButton/InternetButton.h"

// InternetButton b = InternetButton();

int vexDone = D0;
int vexBegin = D1;
int vexTellVexDone = D2;

void setup() {
    // Tell b to get everything ready to go
    // Use b.begin(1); if you have the original SparkButton, which does not have a buzzer or a plastic enclosure
    // to use, just add a '1' between the parentheses in the code below.
    // b.begin();
    Particle.subscribe("hook-response/req", myHandler, MY_DEVICES); // get the current food order
    pinMode(vexDone, INPUT);
    pinMode(vexBegin, OUTPUT);
    pinMode(vexTellVexDone, OUTPUT);
    Serial.begin(9600);
}

void myHandler(const char *event, const char *data)
{
    if (data) {
        char* json = strdup(data);
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& root = jsonBuffer.parseObject(json);
        const char* baconc = root["bacon"];
        String bacon = baconc;
        const char* eggsc = root["eggs"];
        String eggs = eggsc;
        const char* toastc = root["toast"];
        String toast = toastc;
        const char* pancakesc = root["pancakes"];
        String pancakes = pancakesc;
        digitalWrite(vexBegin, HIGH);
    } else {
        Serial.println("NULL");
    }
}

void loop(){
    // dont really do anything here
    if(digitalRead(vexDone) == HIGH){
        Particle.publish("done", "", PRIVATE); // post done
        digitalWrite(vexBegin, LOW);
        digitalWrite(vexTellVexDone, HIGH);
        delay(1000);
    }
}
