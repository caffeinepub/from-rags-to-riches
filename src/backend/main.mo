import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  type Chapter = {
    title : Text;
    subtitle : Text;
    body : Text;
  };

  module Chapter {
    public func compare(chapter1 : Chapter, chapter2 : Chapter) : Order.Order {
      switch (Text.compare(chapter1.title, chapter2.title)) {
        case (#equal) { Text.compare(chapter1.subtitle, chapter2.subtitle) };
        case (order) { order };
      };
    };
  };

  let chapters = [
    {
      title = "Chapter 1: The Slums";
      subtitle = "Where it all began...";
      body = "In a small shack at the edge of society, our hero was born. Surrounded by poverty, hardships shaped their character from a young age.";
    },
    {
      title = "Chapter 2: The Spark";
      subtitle = "A glimmer of hope.";
      body = "Despite the overwhelming odds, a spark of ambition flickered within them. Hard work and determination became their guiding light.";
    },
    {
      title = "Chapter 3: The Climb";
      subtitle = "Step by step, brick by brick.";
      body = "With each new challenge, our hero learned valuable lessons. Slowly but surely, they began to build a better life for themselves.";
    },
    {
      title = "Chapter 4: The Triumph";
      subtitle = "Against all odds.";
      body = "Through perseverance and unwavering faith, they achieved great success. From humble beginnings, they rose to become an inspiration to others.";
    },
  ];

  public query ({ caller }) func getChapters() : async [Chapter] {
    chapters.sort();
  };
};
